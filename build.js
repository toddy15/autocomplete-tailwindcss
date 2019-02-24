'use strict';

const fs = require('fs');
const path = require('path');
const stringify = require('json-stringify-pretty-compact');
const config = require('tailwindcss/defaultConfig')();
const tailwindClassNames = require('tailwind-class-names');

(async () => {
  const options = { config, strings: true };

  const { classNames } = await tailwindClassNames(options);

  const json = stringify(Object.entries(classNames), { maxLength: 1000 });

  fs.writeFileSync(path.join(__dirname, 'src/completions.json'), json);
})();
