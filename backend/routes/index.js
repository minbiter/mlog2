const { User } = require("./User");

const router = async (req, res) => {
  if (req.url.startsWith("/user")) User(req, res);
};

module.exports = {
  router,
};
