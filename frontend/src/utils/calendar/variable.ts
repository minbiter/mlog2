export const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const yearListFcn = () =>
  Array.from(
    { length: new Date().getFullYear() - 2017 + 1 },
    (v, i) => 2017 + i
  );
// const yearList = [2017, 2018, 2019, 2020, 2021, 2022];
export const dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const trKeyList = ["0", "1", "2", "3", "4", "5"];
export const tdKeyList = [
  ["0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6"],
  ["1-0", "1-1", "1-2", "1-3", "1-4", "1-5", "1-6"],
  ["2-0", "2-1", "2-2", "2-3", "2-4", "2-5", "2-6"],
  ["3-0", "3-1", "3-2", "3-3", "3-4", "3-5", "3-6"],
  ["4-0", "4-1", "4-2", "4-3", "4-4", "4-5", "4-6"],
  ["5-0", "5-1", "5-2", "5-3", "5-4", "5-5", "5-6"],
];

export const toStringDateFcn = (...args: number[] | Date[]): string => {
  if (typeof args[0] !== "number") {
    return `${args[0].getFullYear()}${("0" + (args[0].getMonth() + 1)).slice(
      -2
    )}${("0" + args[0].getDate()).slice(-2)}`;
  }
  if (typeof args[1] === "number") {
    return `${args[0]}${("0" + (args[1] + 1)).slice(-2)}${("0" + args[2]).slice(
      -2
    )}`;
  }
  return ``;
};
