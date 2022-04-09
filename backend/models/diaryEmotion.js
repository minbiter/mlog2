async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.diaryEmotion (\
      id INT NOT NULL AUTO_INCREMENT,\
      diaryId INT,\
      topEmotion VARCHAR(10) NOT NULL,\
      neutral INT NOT NULL DEFAULT 0,\
      positive INT NOT NULL DEFAULT 0,\
      negative INT NOT NULL DEFAULT 0,\
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

module.exports = {
  init,
};
