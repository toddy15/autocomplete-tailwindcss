'use babel';

describe('autocomplete-tailwindcss', () => {
  let editor, provider;

  function getCompletions () {
    const cursor = editor.getLastCursor();
    const bufferPosition = cursor.getBufferPosition();
    const scopeDescriptor = cursor.getScopeDescriptor();
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
    const prefixMatch = /(\b|['"~`!@#$%^&*(){}[\]=+,/?>])((\w+[\w-]*)|([.:;[{(< ]+))$/.exec(line);
    const prefix = prefixMatch ? prefixMatch[2] : '';
    return provider.getSuggestions({ editor, bufferPosition, scopeDescriptor, prefix });
  }

  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('autocomplete-tailwindcss'));
    waitsForPromise(() => atom.workspace.open('test.html'));

    runs(() => {
      editor = atom.workspace.getActiveTextEditor();
      provider = atom.packages.getActivePackage('autocomplete-tailwindcss').mainModule.getProvider();
    });
  });

  it('returns no completions when current project does not have tailwind installed', () => {
    provider.isTailwindProject = false;

    editor.setText('<div class="bg-black');
    expect(getCompletions().length).toBe(0);
  });

  it('returns no completions when not at the start of the class attribute', () => {
    provider.isTailwindProject = true;
    editor.setText('');
    expect(getCompletions().length).toBe(0);
  });

  it('autocompletes html class attribute', () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="bg-black');
    editor.setCursorBufferPosition([0, 19]);

    const completions = getCompletions();
    expect(completions.length).toBe(1);
    expect(completions[0].text).toContain('bg-black');
    expect(completions[0].rightLabel).toContain('--tw-bg-opacity: 1; background-color: rgba(0, 0, 0, var(--tw-bg-opacity));');
    expect(completions[0].leftLabelHTML).toContain('<div style="background-color: rgba(0, 0, 0, 1)" class="tailwind__color-preview"></div>');
  });

  it('autocompletes @apply at-rule', () => {
    provider.isTailwindProject = true;

    editor.setText('@apply font-sa');
    editor.setCursorBufferPosition([0, 14]);

    expect(getCompletions().length).toBe(1);
  });

  it('autocompletes html className attribute', () => {
    provider.isTailwindProject = true;

    editor.setText('<div className="font-sa');
    editor.setCursorBufferPosition([0, 23]);

    expect(getCompletions().length).toBe(1);
  });

  it('autocompletes with starting dash', () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="-');
    editor.setCursorBufferPosition([0, 14]);

    expect(getCompletions()[0].text).toBe('-backdrop-hue-rotate-15');
  });
});
