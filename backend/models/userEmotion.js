async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.userEmotion (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT,\
      genreId INT,\
      count INT DEFAULT 1, \
      topEmotion VARCHAR(10),\
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

async function selectUserEmotion(connection, data) {
  const [rows] = await connection.execute(
    "SELECT * FROM mlog.userEmotion WHERE uid = ? AND genreId = ?;",
    [data.uid, data.genreId]
  );
  if (rows.length) {
    return [true, { userEmotion: rows[0] }];
  }
  return [
    false,
    { userEmotion: "해당 유저의 감정을 찾을 수 없습니다.(hint: 설문조사를 해주세요.)" },
  ];
}

async function selectAllUserEmotion(connection, data) {
  const [rows] = await connection.execute(
    "SELECT * FROM mlog.userEmotion WHERE uid = ?",
    [data.uid]
  );
  if (rows.length) {
    return [true, { userEmotion: rows }];
  }
  return [
    false,
    { userEmotion: "해당 유저의 감정을 찾을 수 없습니다.(hint: 설문조사를 해주세요.)" },
  ];
}

async function insertUserEmotion(connection, data) {
  let query =
    "INSERT INTO mlog.userEmotion (uid, genreId, topEmotion, neutral, positive, negative) VALUES ";
  for (const key in data) {
    query += `(${data[key].uid}, ${data[key].genreId}, '${data[key].topEmotion}', ${data[key].neutral}, ${data[key].positive}, ${data[key].negative}),`;
  }
  const [rows] = await connection.execute(query.replace(/.$/, ";"));
  if (!rows.affectedRows) {
    return [false, { survey: "설문작성에 실패했습니다." }];
  }
  return [true, { survey: "설문 작성에 성공했습니다." }];
}

async function deleteUserEmotion(connection, data) {
  const [rows] = await connection.execute("DELETE FROM mlog.userEmotion WHERE uid = ?;", [
    data.uid,
  ]);
  if (!rows.affectedRows) {
    return [false, { survey: "설문조사 초기화에 실패했습니다." }];
  }
  return [true, { survey: "설문조사가 초기화되었습니다." }];
}

module.exports = {
  init,
  selectUserEmotion,
  selectAllUserEmotion,
  insertUserEmotion,
  deleteUserEmotion,
};
