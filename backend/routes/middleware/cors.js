const env = process.env.NODE_ENV || "DEVELOPMENT";

const cors = async (req, res) => {
  // referrer 검증. CSRF 공격에 대한
  try {
    const requestHost = new URL(req.headers.referer).host;
    const accessHost = new URL(process.env[`${env}_ACCESS_ORIGIN`]).host;
    if (requestHost !== accessHost) return false;
  } catch (err) {
    return false;
  }
  // preflight request. 에 대한 응답
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", process.env[`${env}_ACCESS_ORIGIN`]);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", 86400);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.end();
    return false;
  } else {
    // actual request. 에 대한 응답
    res.setHeader("Access-Control-Allow-Origin", process.env[`${env}_ACCESS_ORIGIN`]);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  return true;
};

module.exports = {
  cors,
};
