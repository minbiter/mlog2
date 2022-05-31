async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.diary (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT,\
      diaryDate INT NOT NULL,\
      title VARCHAR(255) NOT NULL,\
      content TEXT NOT NULL,\
      isMusic boolean DEFAULT false,\
      createdAt DATETIME NOT NULL,\
      updatedAt DATETIME NOT NULL,\
      PRIMARY KEY (id),\
      INDEX uid_idx (uid ASC), \
      CONSTRAINT fk_diary_user_uid\
        FOREIGN KEY (uid)\
        REFERENCES mlog.user (id)\
        ON UPDATE CASCADE\
        ON DELETE SET NULL\
    ) ENGINE=InnoDB;"
  );
}

async function insertDiary(connection, data) {
  const [rows] = await connection.execute(
    "INSERT INTO mlog.diary (uid, diaryDate, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);",
    [data.uid, data.diaryDate, data.title, data.content, data.createdAt, data.updatedAt]
  );
  if (!rows.affectedRows) {
    return [false, { diary: "일기 작성을 실패했습니다." }];
  }
  return [true, { diary: { diaryId: rows.insertId } }];
}

async function selectDiary(connection, data) {
  const [diaryRows] = await connection.execute(
    "SELECT D.id, D.uid, D.diaryDate, D.title, D.content, D.isMusic, DE.topEmotion, DE.positive, DE.negative, DE.neutral\
    FROM mlog.diary D\
    JOIN mlog.diaryEmotion DE\
      ON DE.diaryId = D.id\
    WHERE uid = ? AND diaryDate = ?;",
    [data.uid, data.diaryDate]
  );
  let musicRows = null;

  if (diaryRows.length) {
    if (diaryRows[0].isMusic) {
      [musicRows] = await connection.execute(
        "SELECT title, artist, img, genreId, videoId FROM mlog.music WHERE id = (SELECT musicId FROM mlog.diaryMusic WHERE diaryId = ?);",
        [diaryRows[0].id]
      );
    }
    if (musicRows) {
      return [true, { diary: { ...diaryRows[0], music: musicRows[0] } }];
    } else {
      return [true, { diary: { ...diaryRows[0], music: {} } }];
    }
  }
  return [false, { diary: "해당 날짜의 일기가 존재하지 않습니다." }];
}

async function updateDiaryTitleContent(connection, data) {
  let query = "UPDATE mlog.diary SET ";
  const keyList = ["title", "content", "updatedAt"];
  const values = [];
  for (var i = 0; i < keyList.length; i++) {
    if (data.hasOwnProperty(keyList[i])) {
      query += `${keyList[i]} = ?, `;
      values.push(keyList[i]);
    }
  }
  query = query.replace(/..$/, " WHERE uid = ? AND diaryDate = ?;");

  const [rows] = await connection.execute(query, [
    ...values.map((v) => data[v]),
    data.uid,
    data.diaryDate,
  ]);
  if (!rows.affectedRows) {
    return [false, { diary: "일기 수정이 실패했습니다." }];
  }
  return [true, { diary: "일기 수정이 완료되었습니다." }];
}

async function deleteDiary(connection, data) {
  const [rows] = await connection.execute(
    "DELETE FROM mlog.diary WHERE uid = ? AND diaryDate = ?;",
    [data.uid, data.diaryDate]
  );
  if (!rows.affectedRows) {
    return [false, { diary: "일기 삭제에 실패했습니다." }];
  }
  return [true, { diary: "일기가 삭제되었습니다." }];
}

async function selectCanlendar(connection, data) {
  const [rows] = await connection.execute(
    "SELECT D.diaryDate, D.title, DE.topEmotion\
    FROM mlog.diaryEmotion DE\
    JOIN mlog.diary D\
    ON D.id = DE.diaryId\
    WHERE uid = ? AND diaryDate >= ? AND diaryDate <= ?",
    [data.uid, data.startDate, data.endDate]
  );
  const customRows = {};
  let positiveCnt = 0;
  let negativeCnt = 0;
  let neutralCnt = 0;
  if (rows.length) {
    rows.forEach((row) => {
      customRows[`${row.diaryDate}`] = {};
      customRows[`${row.diaryDate}`]["title"] = row.title;
      customRows[`${row.diaryDate}`]["topEmotion"] = row.topEmotion;
      if (row.topEmotion === "positive") positiveCnt++;
      else if (row.topEmotion === "negative") negativeCnt++;
      else neutralCnt++;
    });
    customRows["positiveCnt"] = positiveCnt;
    customRows["negativeCnt"] = negativeCnt;
    customRows["neutralCnt"] = neutralCnt;
    return [true, { diary: customRows }];
  }
  return [false, { diary: "해당 날짜 범위의 일기가 존재하지 않습니다." }];
  // return [false, { diary: { positiveCnt, negativeCnt, neutralCnt } }];
}

async function selectMusic(connection, data) {
  if (!data.topEmotion) {
    const result = {
      popular: null,
      positive: [],
      negative: [],
      neutral: [],
    };

    const [rowsOne] = await connection.execute(
      `
        SELECT DDE.topEmotion, DDE.diaryDate, DDE.updatedAt, M.id, M.title, M.artist, M.genreId, M.img, M.videoId
        FROM mlog.music M
          JOIN mlog.diaryMusic DM
          ON DM.musicId = M.id
          JOIN (
            SELECT TDDE.* FROM (
              (
                SELECT D.id, D.diaryDate, D.updatedAt, DE.topEmotion FROM mlog.diary D, mlog.diaryEmotion DE
                WHERE D.uid = ? AND D.isMusic = 1 AND D.id = DE.diaryId AND DE.topEmotion = "positive"
              )
              UNION
              (
                SELECT D.id, D.diaryDate, D.updatedAt, DE.topEmotion FROM mlog.diary D, mlog.diaryEmotion DE
                WHERE D.uid = ? AND D.isMusic = 1 AND D.id = DE.diaryId AND DE.topEmotion = "negative"
              )
              UNION
              (
                SELECT D.id, D.diaryDate, D.updatedAt, DE.topEmotion FROM mlog.diary D, mlog.diaryEmotion DE
                WHERE D.uid = ? AND D.isMusic = 1 AND D.id = DE.diaryId AND DE.topEmotion = "neutral"
              )
            ) TDDE
          ) DDE
          ON DDE.id = DM.diaryId 
        ORDER BY DDE.diaryDate DESC;
        `,
      [data.uid, data.uid, data.uid]
    );
    const [rowsTwo] = await connection.query(
      "SELECT M.id, M.title, M.artist, M.genreId, M.img, M.videoId FROM mlog.music M JOIN mlog.surveyMusic SM ON SM.musicId = M.id"
    );

    rowsOne.forEach((row) => {
      if (row.topEmotion === "positive") result.positive.push(row);
      else if (row.topEmotion === "negative") result.negative.push(row);
      else result.neutral.push(row);
    });
    result.popular = rowsTwo;

    return result;
  } else {
    const result = {};
    const [rows] = await connection.execute(
      `
      SELECT DDE.diaryDate, DDE.updatedAt, M.title, M.artist, M.genreId, M.img, M.videoId
      FROM mlog.music M
        JOIN mlog.diaryMusic DM
        ON DM.musicId = M.id
        JOIN (
          SELECT D.id, D.diaryDate, D.updatedAt FROM mlog.diary D, mlog.diaryEmotion DE
          WHERE D.uid = ? AND D.isMusic = 1 AND D.id = DE.diaryId AND DE.topEmotion = ?
          ) DDE
          ON DDE.id = DM.diaryId
      ORDER BY DDE.diaryDate DESC
        `,
      [data.uid, data.topEmotion]
    );
    result[data.topEmotion] = rows;

    return result;
  }
}

module.exports = {
  init,
  insertDiary,
  selectDiary,
  updateDiaryTitleContent,
  deleteDiary,
  selectCanlendar,
  selectMusic,
};
