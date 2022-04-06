async function init(connection) {
  const { err } = await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.sentiment (\
      id INT NOT NULL AUTO_INCREMENT,\
      diaryId INT,\
      topSentiment VARCHAR(10) NOT NULL,\
      neutral INT NOT NULL,\
      positive INT NOT NULL,\
      negative INT NOT NULL,\
      PRIMARY KEY (id),\
      INDEX diaryId_idx (diaryId ASC) VISIBLE,\
      CONSTRAINT fk_sentiment_diary_diaryId\
        FOREIGN KEY (diaryId)\
        REFERENCES mlog.diary (id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE\
    ) ENGINE=InnoDB;"
  );

  if (err) throw err;
}

module.exports = {
  init,
};
