const { authentication } = require("../middleware/token");
const { connect } = require("../../models");
const { rangeDate } = require("./util");
const { selectCanlendar } = require("../../models/diary");

const env = process.env.NODE_ENV || "DEVELOPMENT";

const Calendar = async (req, res) => {
  const urlParams = new URLSearchParams(
    new URL(req.url, process.env[`${env}_URL`]).search
  );
  const [resultAuth, dataAuth] = authentication(req, res);
  if (resultAuth) {
    // startDate와 endDate는 둘다 존재하거나 둘다 존재하지 않을 경우만 해당됩니다.
    const [resultRange, startDate, endDate] = rangeDate(
      urlParams.get("startDate"),
      urlParams.get("endDate")
    );
    if (resultRange) {
      const data = {
        uid: dataAuth.id,
        startDate,
        endDate,
      };
      const [resultSelectCalendar, dataSelectCalendar] = await selectCanlendar(
        connect(),
        data
      );
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      if (resultSelectCalendar) {
        res.end(JSON.stringify({ result: true, data: dataSelectCalendar }));
      } else {
        res.end(JSON.stringify({ result: false, data: dataSelectCalendar }));
      }
    } else {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(
        JSON.stringify({
          result: false,
          data: { calendar: "URL Parameter Error" },
        })
      );
    }
  }
};

module.exports = {
  Calendar,
};
