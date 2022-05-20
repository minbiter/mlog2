/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { title, analysisTitle, emotionTitle } from "./style";
const options = {
  charts: {
    id: "basic-bar",
  },
  chart: {
    toolbar: { show: false },
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
      <Chart
        options={options}
        series={series}
        type="bar"
        width="460"
        height="250"
      />
    </>
  );
};

export default DiaryAnalysis;
