async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.diary (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT,\
      diaryDate VARCHAR(10) NOT NULL,\
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
    [data.id, data.diaryDate, data.title, data.content, data.createdAt, data.updatedAt]
  );
  if (!rows.affectedRows) {
    return [false, { diary: "일기 작성의 실패했습니다." }];
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

module.exports = {
  init,
  insertDiary,
  selectDiary,
};
