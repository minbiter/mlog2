const jwt = require("jsonwebtoken");

async function init(connection) {
  const [rows] = await connection.query(
    "\
    SELECT 1 FROM Information_schema.tables\
    WHERE table_schema = 'mlog'\
    AND table_name = 'token'\
    "
  );
  await connection.execute(
    "\
    CREATE TABLE IF NOT EXISTS mlog.token (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT NOT NULL,\
      jwt VARCHAR(255) NOT NULL,\
      expires DATETIME NOT NULL,\
      PRIMARY KEY (id),\
      INDEX uid_idx (uid ASC),\
      CONSTRAINT fk_token_user_uid\
        FOREIGN KEY (uid)\
        REFERENCES mlog.user (id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE\
    ) ENGINE=InnoDB;"
  );

  if (!rows.length) await insertGuestToken(connection);
}

async function insertGuestToken(connection) {
  const refreshTokenExpire = new Date();
  refreshTokenExpire.setFullYear(refreshTokenExpire.getFullYear() + 10);

  const refreshToken = jwt.sign(
    {
      id: `1`,
      email: `guest@mlog.com`,
      exp: Math.floor(refreshTokenExpire / 1000),
    },
    `${process.env.TOKEN_KEY}`
  );

  await connection.execute(
    "INSERT INTO mlog.token (uid, jwt, expires) VALUES (?, ?, ?);",
    [1, refreshToken, refreshTokenExpire]
  );
  console.log("guest@mlog.com token 생성");
}

async function insertToken(connection, data) {
  await connection.execute(
    "INSERT INTO mlog.token (uid, jwt, expires) VALUES (?, ?, ?);",
    [data.uid, data.jwt, data.expires]
  );
}

async function selectToken(connection, uid) {
  const [rows] = await connection.execute("SELECT * FROM mlog.token WHERE uid=?;", [uid]);
  return rows[0];
}

async function deleteToken(connection, uid) {
  await connection.execute("DELETE FROM mlog.token WHERE uid=?", [uid]);
}

module.exports = {
  init,
  insertToken,
  selectToken,
  deleteToken,
};
