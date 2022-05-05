const { genreId } = require("./util/musicApi");
const axios = require("axios");
async function init(connection) {
  const [rows] = await connection.query(
    "\
    SELECT 1 FROM Information_schema.tables\
    WHERE table_schema = 'mlog'\
    AND table_name = 'surveyMusic'\
    "
  );
  await connection.execute(
    "CREATE TABLE IF NOT EXISTS mlog.surveyMusic (\
      id INT NOT NULL AUTO_INCREMENT,\
      musicId BIGINT,\
      genreId INT,\
      PRIMARY KEY (id),\
      INDEX musicId_idx (musicId ASC) VISIBLE,\
      INDEX genreId_idx (genreId ASC) VISIBLE,\
      CONSTRAINT fk_surveyMusic_music_musicId\
        FOREIGN KEY (musicId)\
        REFERENCES mlog.music (id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE,\
      CONSTRAINT fk_surveyMusic_genre_genreId\
        FOREIGN KEY (genreId)\
        REFERENCES mlog.genre (id)\
        ON UPDATE CASCADE\
        ON DELETE CASCADE\
      )ENGINE=InnoDB;\
      "
  );
  if (!rows.length) await InsertSurveyMusic(connection);
}

async function InsertSurveyMusic(connection) {
  const musicListBaseURL =
    "https://www.music-flo.com/api/display/v1/browser/chart/genre/track/list?size=100";
  const musicListPromiseAll = [];
  let musicListByGenre = [];
  let query = "INSERT INTO mlog.surveyMusic (musicId, genreId) VALUES ";
  // 병렬처리를 위해 장르별 axios객체 생성.
  for (const key in genreId) {
    const musicListURL = musicListBaseURL.replace("genre", genreId[key]);
    musicListPromiseAll.push(
      axios.create({
        baseURL: musicListURL,
      })
    );
  }
  musicListByGenre = await Promise.all(Array.from(musicListPromiseAll, (v) => v.get()));
  let i = 0;
  for (const key in genreId) {
    query += `(${musicListByGenre[i].data.data.trackList[0].id}, ${genreId[key]}),`;
    i++;
  }
  connection.execute(query.replace(/.$/, ";"));
}

module.exports = {
  init,
};
