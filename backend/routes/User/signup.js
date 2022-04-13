const { isValidSignUp } = require("./util");
const { insertUser } = require("./../../models/user");
const { connect } = require("./../../models");

const SignUp = async (req, res) => {
  let payload = "";
  req.on("data", (data) => {
    payload += data;
  });
  req.on("end", async () => {
    const parsePayload = JSON.parse(payload);
    const [result, data] = await isValidSignUp(
      parsePayload.email,
      parsePayload.password,
      parsePayload.passwordConfirm
    );

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    if (result) {
      await insertUser(await connect(), {
        email: parsePayload.email,
        password: parsePayload.password,
      });
      res.end(JSON.stringify({ result }));
    } else {
      res.end(JSON.stringify({ result, data }));
    }
  });
};

module.exports = {
  SignUp,
};
