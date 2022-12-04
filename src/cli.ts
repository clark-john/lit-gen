#!/usr/bin/env node

/**
 * main cli
 *
 * @author John Clark
 * @desc Command line tool for generation of different types of lit web components
 */

import { green, yellow, red } from "colorette";
import { isTypeScriptProject } from "./utils";
import { generate } from "./commands";

interface Command {
  name: string;
  help: string;
  handle?: Function;
}

if (!isTypeScriptProject()) {
  console.log(
    yellow(
      "Warning: This project doesn't have TypeScript, or it is still not configured."
    )
  );
}

const displayHelp = (): void => {
  console.log("Usage: lit-gen <COMMAND> <OPTIONS>\n\nAvailable Commands:");
  for (const { name, help } of commands) {
    console.log(`${green(name)}  -  ${help}`);
  }
};

const commands: Command[] = [
  {
    name: "help",
    help: "Displays this",
    handle: () => displayHelp(),
  },
  {
    name: "generate",
    help: "Generate new Lit web element",
    handle: () => generate(process.argv),
  },
];

const command = process.argv[2];
if (command) {
  if (command.startsWith("--") || command.startsWith("-")) {
    console.log("not a command");
  } else {
    const cmd: Command | undefined = commands.find(x => x.name === command);
    if (!cmd) {
      console.log(red("Unknown command: " + command));
      process.exit(1);
    } else {
      cmd.handle ? cmd.handle() : void 0;
    }
  }
} else {
  displayHelp();
}
