import { CodeNode } from "@flyde/core";

const namespace = "Console";

export const Log: CodeNode = {
  id: "Log",
  defaultStyle: {
    icon: "fa-terminal",
  },
  namespace,
  description: "Logs a value to the console",
  inputs: {
    value: { description: "Value to log" },
  },
  outputs: {},
  run: ({ value }) => console.log(value),
};

export const Error: CodeNode = {
  id: "Error",
  defaultStyle: {
    icon: "fa-terminal",
  },
  namespace,
  description: "Logs an error to the console",
  inputs: {
    value: { description: "Value to log" },
  },
  outputs: {},
  run: ({ value }) => console.error(value),
};
