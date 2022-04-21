const NotFound = (req, res) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ result: false, data: { 404: "Not Found" } }));
};

module.exports = {
  NotFound,
};
