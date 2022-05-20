import { css } from "@emotion/react";

export const title = css`
  align-self: flex-start;
  margin-bottom: 5px;
`;

export const analysisTitle = css`
  font-size: 18px;
  font-weight: 500;
`;

export const emotionTitle = (topEmotion: string) => css`
  font-size: 18px;
  font-weight: 500;
  color: ${topEmotion === "positive"
    ? "#2196F3"
    : topEmotion === "negative"
    ? "#F44336"
    : "#00C471"};
`;
