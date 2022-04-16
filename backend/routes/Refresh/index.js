const { createAccessToken, verifyRefreshToken } = require("./../middleware/token");

const Refresh = async (req, res) => {
  if (req.method === "GET") {
    const [result, data] = await verifyRefreshToken(req, res);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (result) {
      const [accessToken] = createAccessToken(data);
      res.end(JSON.stringify({ result, data: { accessToken } }));
    } else {
      res.end(JSON.stringify({ result, data }));
    }
  }
};

module.exports = {
  Refresh,
};
