async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.diary (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT,\
      diaryDate INT NOT NULL,\
      title VARCHAR(255) NOT NULL,\
      content TEXT NOT NULL,\
      createdAt DATETIME NOT NULL,\
      updatedAt DATETIME NOT NULL,\
      PRIMARY KEY (id),\
      INDEX uid_idx (uid ASC) VISIBLE, \
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
  const [rows] = await connection.execute(
    "SELECT id, uid, diaryDate, title, content FROM mlog.diary WHERE uid = ? AND diaryDate = ?;",
    [data.uid, data.diaryDate]
  );
  if (rows.length) {
    return [true, { diary: rows[0] }];
  }
  return [false, { diary: "해당 날짜의 일기가 존재하지 않습니다." }];
}

async function updateDiaryTitleContent(connection, data) {
  let query = "UPDATE mlog.diary SET ";
  const values = ["title", "content", "updatedAt"];

  for (var i = 0; i < values.length; i++) {
    if (data.hasOwnProperty(values[i])) {
      query += `${values[i]} = ?, `;
    } else {
      values.splice(i, 1);
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
    "SELECT D.diaryDate, E.emotion\
    FROM mlog.diaryEmotion E\
    JOIN mlog.diary D\
    ON D.id = E.diaryId\
    WHERE uid = ? AND diaryDate >= ? AND diaryDate <= ?",
    [data.uid, data.startDate, data.endDate]
  );
  const customRows = {};
  if (rows.length) {
    rows.forEach((row) => {
      customRows[`${row.diaryDate}`] = {};
      customRows[`${row.diaryDate}`]["emotion"] = row.emotion;
    });
    return [true, { diary: customRows }];
  }
  return [false, { diary: "해당 날짜 범위의 일기가 존재하지 않습니다." }];
}

module.exports = {
  init,
  insertDiary,
  selectDiary,
  updateDiaryTitleContent,
  deleteDiary,
  selectCanlendar,
};
