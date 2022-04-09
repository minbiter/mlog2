const { genreId } = require("./util/musicApi");

async function init(connection) {
  const [rows] = await connection.query(
    "\
    SELECT 1 FROM Information_schema.tables\
    WHERE table_schema = 'mlog'\
    AND table_name = 'genre'\
    "
  );
  connection.execute(
    "\
    CREATE TABLE IF NOT EXISTS mlog.genre (\
      id INT NOT NULL,\
      name VARCHAR(30),\
      PRIMARY KEY (id)\
    )ENGINE=InnoDB;"
  );
  if (!rows.length) await InsertGenre(connection);
}

async function InsertGenre(connection) {
  let query = "INSERT INTO mlog.genre VALUES ";
  for (const name in genreId) {
    query += `(${genreId[name]}, '${name}'),`;
  }
  await connection.execute(query.replace(/.$/, ";"));
}

module.exports = {
  init,
};
