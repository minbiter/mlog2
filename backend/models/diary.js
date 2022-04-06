async function init(connection) {
  const { err } = await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.diary (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT,\
      diaryDate VARCHAR(10) NOT NULL,\
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
  if (err) throw err;
}

module.exports = {
  init,
};
