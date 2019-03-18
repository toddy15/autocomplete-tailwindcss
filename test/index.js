'use strict';

const test = require('tape');
const autocomplete = require('../src');
const provider = require('../src/provider');

test('package', t => {
  t.equal(autocomplete.getProvider(), provider, 'package loads provider');
  t.end();
});

test('suggestions', t => {
  const getSuggestions = (prefix) => {
    return provider.getSuggestions({
      bufferPosition: { row: 10 },
      editor: {
        getTextInRange: () => {
          return 'className';
        }
      },
      prefix
    });
  };

  t.equal(getSuggestions('bg-red-darkest')[0].text, 'bg-red-darkest', 'suggest completion bg-red-darkest');
  t.deepEqual(getSuggestions(''), [], 'suggest nothing for empty prefix');
  t.end();
});
