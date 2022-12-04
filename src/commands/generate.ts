import arg from "arg";
import { green, red } from "colorette";
import { writeFileSync, openSync, closeSync, mkdirSync, existsSync } from "fs";
import { camelCase } from "lodash";
import path from "path";
import * as tp from "../templates";

import { getArgs, containsOptions, getOptions } from "./utils";
import { validateName } from "../utils";

const types = ["element", "mixin", "controller", "directive"];
function listOfComponentTypes() {
  console.log("List of available types of components:");
  for (const x of types) {
    console.log(`  - ${green(x)}`);
  }
}

function printError(message: string): void {
  console.error(red(message));
  process.exit(1);
}

export const generate = (args: string[]) => {
  if (containsOptions(args)) {
    const options = getOptions(args);
    try {
      arg({
        "--help": Boolean,
        "--list": Boolean,
      });
      if (options.length >= 2) {
        console.log("One option at a time");
      } else {
        const obj: { [key: string]: any } = {
          "--list": listOfComponentTypes,
          "--help": null,
        };
        const func = obj[options[0]];
        func ? func() : void 0;
      }
    } catch (e: any) {
      options.forEach(x => {
        console.log("Unknown option: " + x);
      });
    }
  } else {
    const argumnts = getArgs(args);
    const type = argumnts[1];
    const name = argumnts[2];
    const filePath = argumnts[3];

    if (type && !types.includes(type)) {
      console.log("Unknown type: " + type);
    } else if (!type) {
      printError("Missing 'type' argument");
    }

    if (!name) {
      printError("Missing 'name' argument");
    } else if (!validateName(name)) {
      printError(`Invalid name '${name}'`);
    }

    if (!path) {
      printError("Missing 'path' argument");
    } else if (path.isAbsolute(filePath)) {
      printError("File path cannot be an absolute path");
    }

    const file = filePath.concat(`/${camelCase(name)}.ts`);
    const dir = path.parse(file).dir;

    if (!existsSync(dir)) mkdirSync(dir);

    const fd = openSync(file, "w+");
    writeFileSync(file, (tp as { [key: string]: any })[type](name));
    closeSync(fd);

    console.log(green("Component generated successfully!"));
  }
};
