'use strict';

const fs = require('fs');
const path = require('path');
const stringify = require('json-stringify-pretty-compact');
const tailwindClassNames = require('tailwind-class-names');

(async () => {
  const { classNames } = await tailwindClassNames({
    configPath: path.join(__dirname, './tailwind.js'),
    pluginPath: path.join(__dirname, '../node_modules/tailwindcss'),
    strings: true
  });

  const json = stringify(Object.entries(classNames), { maxLength: 1000 });

  fs.writeFileSync(path.join(__dirname, '../src/completions.json'), json);
})();
