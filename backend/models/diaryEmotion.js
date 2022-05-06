async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.diaryEmotion (\
      id INT NOT NULL AUTO_INCREMENT,\
      diaryId INT NOT NULL,\
      topEmotion VARCHAR(10),\
      neutral INT NOT NULL DEFAULT 0,\
      positive INT NOT NULL DEFAULT 0,\
      negative INT NOT NULL DEFAULT 0, \
      PRIMARY KEY (id),\
      INDEX diaryId_idx (diaryId ASC) VISIBLE,\
      CONSTRAINT fk_diaryEmotion_diary_diaryId\
        FOREIGN KEY (diaryId)\
        REFERENCES mlog.diary (id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE\
    ) ENGINE=InnoDB;"
  );
}

async function insertDiaryEmotion(connection, data) {
  const [rows] = await connection.execute(
    "INSERT INTO mlog.diaryEmotion (diaryId, topEmotion, positive, negative, neutral) VALUES (?, ?, ?, ?, ?);",
    [data.diaryId, data.topEmotion, data.positive, data.negative, data.neutral]
  );
  if (!rows.affectedRows) {
    return [false, { diary: "일기 작성을 실패했습니다." }];
  }
  return [true, { diary: { diaryEmotionId: rows.insertId } }];
}

async function updateDiaryEmotion(connection, data) {
  const [rows] = await connection.execute(
    "UPDATE mlog.diaryEmotion SET topEmotion = ?, positive = ?, negative = ?, neutral = ? WHERE diaryId = (SELECT id FROM mlog.diary WHERE uid = ? AND diaryDate = ?);",
    [
      data.topEmotion,
      data.positive,
      data.negative,
      data.neutral,
      data.uid,
      data.diaryDate,
    ]
  );
  if (!rows.affectedRows) {
    return [false];
  }
  return [true];
}

module.exports = {
  init,
  insertDiaryEmotion,
  updateDiaryEmotion,
};
