'use babel';

const path = require('path');

describe('autocomplete-tailwind', () => {
  let provider;

  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('autocomplete-tailwind'));
    waitsForPromise(() => atom.workspace.open('test.html'));

    runs(() => {
      provider = atom.packages.getActivePackage('autocomplete-tailwind').mainModule.getProvider();
    });
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
