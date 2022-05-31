async function init(connection) {
  await connection.execute(
    "\
    CREATE TABLE IF NOT EXISTS mlog.diaryMusic (\
      id INT NOT NULL AUTO_INCREMENT,\
      diaryId INT,\
      musicId BIGINT,\
      PRIMARY KEY (id),\
      INDEX diaryId_idx (diaryId ASC),\
      INDEX musicId_idx (musicId ASC),\
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

async function insertDiaryMusic(connection, data) {
  const rowList = await Promise.all([
    connection.execute("INSERT INTO mlog.diaryMusic (diaryId, musicId) VALUES (?, ?);", [
      data.diaryId,
      data.musicId,
    ]),
    connection.execute(
      "UPDATE mlog.userEmotion SET count = ?, positive = ?, negative = ?, neutral = ? WHERE uid = ? AND genreId = ?;",
      [data.count, data.positive, data.negative, data.neutral, data.uid, data.genreId]
    ),
    connection.execute(
      "UPDATE mlog.diary SET isMusic = true WHERE uid = ? AND diaryDate = ?;",
      [data.uid, data.diaryDate]
    ),
    connection.execute("SELECT topEmotion FROM mlog.diaryEmotion WHERE diaryId = ?", [
      data.diaryId,
    ]),
  ]);
  if (
    !rowList[0][0].affectedRows ||
    !rowList[1][0].affectedRows ||
    !rowList[2][0].affectedRows
  ) {
    return [false, { diaryMusic: "음악 선택에 실패했습니다." }];
  }
  return [
    true,
    {
      diaryMusic: "음악 선택이 완료되었습니다.",
      topEmotion: rowList[3][0][0].topEmotion,
    },
  ];
}

module.exports = {
  init,
  insertDiaryMusic,
};
