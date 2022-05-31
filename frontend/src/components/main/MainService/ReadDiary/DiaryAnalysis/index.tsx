/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { title, analysisTitle, emotionTitle, analysisChart } from "./style";
const options = {
  charts: {
    id: "basic-bar",
  },
  chart: {
    toolbar: { show: false },
    // width: "460px",
    width: "100%",
  },
  xaxis: {
    categories: ["긍정", "부정", "중립"],
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  colors: ["#2196F3", "#F44336", "#00C471"],
};

interface IDIaryAnalysisParams {
  topEmotion: string;
  emotionData: Array<number>;
}

const DiaryAnalysis = ({ topEmotion, emotionData }: IDIaryAnalysisParams) => {
  const [series, setSeries] = useState<Array<{ name: string; data: number[] }>>(
    []
  );
  useEffect(() => {
    setSeries([{ name: "문장 개수", data: emotionData }]);
  }, [emotionData]);

  return (
    <>
      <div css={title}>
        <span css={analysisTitle}>이 날의 감정 </span>
        <span css={emotionTitle(topEmotion)}>
          {topEmotion === "positive"
            ? "긍정"
            : topEmotion === "negative"
            ? "부정"
            : "중립"}
        </span>
      </div>
      <div css={analysisChart}>
        <Chart options={options} series={series} type="bar" height="250" />
      </div>
    </>
  );
};

export default DiaryAnalysis;
