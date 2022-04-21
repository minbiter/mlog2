const isValidDiary = (req, res) => {
  const diaryDate = req.url.match(/\d{8}$/)[0];
  const currentDate = new Date();
  const stringDate = `${currentDate.getFullYear()}${(
    "0" +
    (currentDate.getMonth() + 1)
  ).slice(-2)}${("0" + currentDate.getDate()).slice(-2)}`;

  if (parseInt(diaryDate) <= parseInt(stringDate)) return [true];
  else {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        result: false,
        data: { diary: "미래 일기는 작성할 수 없습니다." },
      })
    );
    return [false, { diary: "미래 일기는 작성할 수 없습니다." }];
  }
};

module.exports = {
  isValidDiary,
};
