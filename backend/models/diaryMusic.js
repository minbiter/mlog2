async function init(connection) {
  await connection.execute(
    "\
    CREATE TABLE IF NOT EXISTS mlog.diaryMusic (\
      id INT NOT NULL AUTO_INCREMENT,\
      diaryId INT,\
      musicId BIGINT,\
      PRIMARY KEY (id),\
      INDEX diaryId_idx (diaryId ASC) VISIBLE,\
      INDEX musicId_idx (musicId ASC) VISIBLE,\
      CONSTRAINT fk_diaryMusic_diary_diaryId\
        FOREIGN KEY (diaryId)\
        REFERENCES mlog.diary(id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE,\
      CONSTRAINT fk_diaryMusic_music_musicId\
        FOREIGN KEY (musicId)\
        REFERENCES mlog.music(id)\
        ON UPDATE CASCADE\
        ON DELETE SET NULL\
    )ENGINE=InnoDB;"
  );
}

module.exports = {
  init,
};
