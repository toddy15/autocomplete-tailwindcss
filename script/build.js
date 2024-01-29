"use strict";

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const stringify = require("json-stringify-pretty-compact");
const tailwind = require("tailwindcss");

(async () => {
  const css = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;

  const processor = postcss([tailwind()]);

  const { root } = await processor.process(css, {
    from: "undefined",
  });

  const selectors = root.nodes.filter((rule) => {
    return rule.type === "rule" && rule.selector.startsWith(".");
  });

  const classNames = selectors
    .map(({ selector, nodes }) => {
      selector = selector
        .replace("\\", "")
        .replace(/^\./, "")
        .replace(/:hover$/, "")
        .replace(/:focus$/, "")
        .replace(/::placeholder$/, "")
        .replace(/(\S+) > .*$/, "$1");

      const styles = nodes
        .map(({ prop, value }) => {
          return `${prop}: ${value};`;
        })
        .join(" ");

      return [selector, styles];
    })
    .sort();

  const json = stringify(classNames, { maxLength: 3000 });

  fs.writeFileSync(path.join(__dirname, "../src/completions.json"), json);
})();
