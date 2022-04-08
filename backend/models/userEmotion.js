async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.userEmotion (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT,\
      genreId INT,\
      neutral INT NOT NULL DEFAULT 0,\
      positive INT NOT NULL DEFAULT 0,\
      negative INT NOT NULL DEFAULT 0, \
      PRIMARY KEY (id),\
      INDEX uid_idx (uid ASC) VISIBLE,\
      CONSTRAINT fk_userEmotion_user_uid\
        FOREIGN KEY (uid)\
        REFERENCES mlog.user (id)\
        ON UPDATE CASCADE\
        ON DELETE SET NULL,\
      INDEX genreId_idx (genreId ASC) VISIBLE,\
      CONSTRAINT fk_userEmotion_genre_genreId\
        FOREIGN KEY (genreId)\
        REFERENCES mlog.genre (id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE\
    )ENGINE=InnoDB;"
  );
}

module.exports = {
  init,
};
