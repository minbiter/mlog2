const breakPoints = [575];

const mq = breakPoints.map((breakPoint: number) => {
  return `@media (max-width: ${breakPoint}px)`;
});

interface IMedia {
  xsmall: string;
}

const media: IMedia = {
  xsmall: mq[0],
};

export default media;
