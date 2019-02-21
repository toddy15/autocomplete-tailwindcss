'use strict';

const test = require('tape');
const autocomplete = require('../src');
const provider = require('../src/provider');

test('package', t => {
  t.equal(autocomplete.getProvider(), provider, 'package loads provider');
  t.end();
});

test('suggestions', t => {
  const suggestions = provider.getSuggestions({ prefix: 'bg-red-darkest' });
  t.equal(suggestions[0].text, 'bg-red-darkest', 'suggest completion bg-red-darkest');
  t.end();
});
