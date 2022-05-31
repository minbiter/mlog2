const isValidDate = (req, res) => {
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

const isValidDiary = (res, title, content) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!title) {
    res.end(JSON.stringify({ result: false, data: { diary: "제목을 입력해주세요." } }));
    return false;
  } else if (!content) {
    res.end(JSON.stringify({ result: false, data: { diary: "내용을 입력해주세요." } }));
    return false;
  }
  return true;
};

const rangeDate = (startDate, endDate) => {
  if (startDate && endDate) {
    if (startDate > endDate) {
      return [false];
    }
    return [true, parseInt(startDate), parseInt(endDate)];
  } else if (!startDate && !endDate) {
    const today = new Date();
    let resultStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let resultEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return [
      true,
      parseInt(
        `${resultStartDate.getFullYear()}${("0" + (resultStartDate.getMonth() + 1)).slice(
          -2
        )}${("0" + resultStartDate.getDate()).slice(-2)}`
      ),
      parseInt(
        `${resultEndDate.getFullYear()}${("0" + (resultEndDate.getMonth() + 1)).slice(
          -2
        )}${("0" + resultEndDate.getDate()).slice(-2)}`
      ),
    ];
  } else {
    return [false];
  }
};

module.exports = {
  isValidDate,
  isValidDiary,
  rangeDate,
};
