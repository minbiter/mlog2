async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.diaryEmotion (\
      id INT NOT NULL AUTO_INCREMENT,\
      diaryId INT NOT NULL,\
      emotion VARCHAR(10) NOT NULL,\
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
    "INSERT INTO mlog.diaryEmotion (diaryId, emotion) VALUES (?, ?);",
    [data.diaryId, data.emotion]
  );
  if (!rows.affectedRows) {
    return [false, { diary: "일기 작성을 실패했습니다." }];
  }
  return [true, { diary: { diaryEmotionId: rows.insertId } }];
}

module.exports = {
  init,
  insertDiaryEmotion,
};
