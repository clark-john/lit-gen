import { startCase, range } from "lodash";
import { existsSync } from "fs";

export const capitalize = (str: string) =>
  str[0].toUpperCase() + str.substr(1, str.length);

export const isTwoWords = (word: string): boolean => word.split("-").length > 1;

export const toPascalCase = (word: string) =>
  startCase(word).split(" ").join("");

export const isTypeScriptProject = (): boolean => {
  return existsSync("./tsconfig.json") ? true : false;
};

export const validateName = (name: string): boolean => {
  const symbols = "[]{}:;'\"`<>,./@#$%^&*()-=+_~";
  return Array.from(symbols)
    .concat(range(0, 10).map(x => x.toString()))
    .some((x: string) => name.startsWith(x))
    ? false
    : true;
};
