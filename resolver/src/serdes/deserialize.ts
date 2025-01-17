import { CustomNode, FlydeFlow, flydeFlowSchema } from "@flyde/core";
import * as yaml from "yaml";
import * as rfs from "require-from-string";
import _ = require("lodash");
import * as path from "path";
import { readFileSync } from "fs";

require("ts-node").register({
  // Most ts-node options can be specified here using their programmatic names.
  transpileOnly: true,
  // It is faster to skip typechecking.
  // Remove if you want ts-node to do typechecking.
  // }
});

export function deserializeFlow(flowContents: string, path: string): FlydeFlow {
  const unsafeflow = yaml.parse(flowContents);

  const result = flydeFlowSchema.safeParse(unsafeflow);
  if (result.success === false) {
    throw new Error(`Error parsing Flyde flow ${result.error} from ${path}`);
  }

  const data = result.data;

  const imports = _.mapValues(data.imports || {}, (value) => {
    return typeof value === "string" ? [value] : value;
  });

  data.imports = imports;

  return data as FlydeFlow;
}

export function deserializeFlowByPath(path: string): FlydeFlow {
  try {
    return deserializeFlow(readFileSync(path, "utf8"), path);
  } catch (e) {
    console.error(`Error loading flow at ${path}`, e);
    throw new Error(`Error loading flow at ${path} - ${e}`);
  }
}
