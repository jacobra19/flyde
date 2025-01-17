import React, { useCallback, useRef, useState } from "react";

import { dynamicOutput, dynamicNodeInput } from "@site/../core/dist";

import {
  PlaygroundTemplate,
  PlaygroundTemplateProps,
} from "./_PlaygroundTemplate/PlaygroundTemplate";

import "@flyde/flow-editor/src/index.scss";
import "./style.scss";

// const bundled = require("./flows/hello-world.bundled.json");
import flow from "./_flows/ApisCombination.flyde";
import { OutputLogs } from "./_OutputLogs/OutputLogs";

const META_DATA = {
  title: "HTTP Requests",
  description: `Flyde works great for heavy asynchronous & concurrent tasks, like combining several REST APIs together. This example shows exactly that, by combining 3 different REST APIs, the population of the capital of the country your IP is assigned with is retrieved`,
  key: "api",
  extraInfo: (
    <strong>
      <h3>
        Try double-clicking each API node to see it's underlying implementation!
        In Flyde, nothing is hidden, only abstracted
      </h3>
    </strong>
  ),
};

const outputWithSub = (sub: any) => {
  const o = dynamicOutput();
  o.subscribe(sub);
  return o;
};

export default function ReactCounterExample(): JSX.Element {
  const result = useRef(dynamicOutput());

  const inputs = useRef({ __trigger: dynamicNodeInput() });

  const [flowProps, setFlowProps] = useState<
    PlaygroundTemplateProps["flowProps"]
  >({
    flow: flow.flow,
    dependencies: flow.dependencies,
    inputs: inputs.current,
    output: result.current,
  });

  const prefixComponent = (
    <button
      className="button button--success"
      onClick={() => inputs.current.__trigger.subject.next("run")}
    >
      Run!
    </button>
  );
  return (
    <PlaygroundTemplate
      meta={META_DATA}
      flowProps={flowProps}
      defaultDelay={100}
      prefixComponent={prefixComponent}
    >
      <OutputLogs output={result.current} />
    </PlaygroundTemplate>
  );
}
