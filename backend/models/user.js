async function init(connection) {
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.user (\
      id INT NOT NULL AUTO_INCREMENT,\
      mlogId VARCHAR(50) UNIQUE,\
      password VARCHAR(100),\
      nickName VARCHAR(10) NOT NULL,\
      provider VARCHAR(10) NOT NULL DEFAULT 'local',\
      snsId VARCHAR(50),\
      createdAt DATETIME NOT NULL,\
      updatedAt DATETIME NOT NULL,\
      deletedAt DATETIME,\
      PRIMARY KEY (id)\
    ) ENGINE=InnoDB;"
  );
}

module.exports = {
  init,
};
