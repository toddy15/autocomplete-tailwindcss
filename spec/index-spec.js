'use babel';

const path = require('path');
const autocompleteTailwind = require('../src');
const completionProvider = require('../src/provider');

describe('autocomplete-tailwind', () => {
  let editor, provider;

  function getCompletions () {
    const cursor = editor.getLastCursor();
    const bufferPosition = cursor.getBufferPosition();
    const scopeDescriptor = cursor.getScopeDescriptor();
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
    const prefixMatch = /(\b|['"~`!@#$%^&*(){}[\]=+,/?>])((\w+[\w-]*)|([.:;[{(< ]+))$/.exec(line);
    const prefix = prefixMatch ? prefixMatch[2] : '';
    return provider.getSuggestions({editor, bufferPosition, scopeDescriptor, prefix});
  }

  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('autocomplete-tailwind'));
    waitsForPromise(() => atom.workspace.open('test.html'));

    runs(() => provider = atom.packages.getActivePackage('autocomplete-tailwind').mainModule.getProvider());
    runs(() => editor = atom.workspace.getActiveTextEditor());
  });

  it('detectes tailwind project', async () => {
    atom.project.setPaths([path.join(__dirname, 'fixtures', 'project-tailwind')]);
    setTimeout(() => expect(provider.isTailwindProject).toBe(true), 1000);
  });

  it('detectes project without tailwind', async () => {
    atom.project.setPaths([path.join(__dirname, 'fixtures', 'project-html')]);
    setTimeout(() => expect(provider.isTailwindProject).toBe(false), 1000);
  });
});
