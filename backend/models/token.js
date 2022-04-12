async function init(connection) {
  await connection.execute(
    "\
    CREATE TABLE IF NOT EXISTS mlog.token (\
      id INT NOT NULL AUTO_INCREMENT,\
      uid INT NOT NULL,\
      jwt VARCHAR(255) NOT NULL,\
      expires DATETIME NOT NULL,\
      PRIMARY KEY (id),\
      INDEX uid_idx (uid ASC) VISIBLE,\
      CONSTRAINT fk_token_user_uid\
        FOREIGN KEY (uid)\
        REFERENCES mlog.user (id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE\
    ) ENGINE=InnoDB;"
  );
}

async function insertToken(connection, data) {
  await connection.execute(
    "INSERT INTO mlog.token (uid, jwt, expires) VALUES (?, ?, ?);",
    [data.uid, data.jwt, data.expires]
  );
}

module.exports = {
  init,
  insertToken,
};
