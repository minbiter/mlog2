const { router } = require("./routes");

const config = async (req, res) => {
  try {
    await router(req, res);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error : 서버 오류");
  }
};

module.exports = {
  config,
};
