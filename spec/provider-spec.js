"use babel";

describe("autocomplete-tailwindcss", () => {
  let editor, provider;

  function getCompletions() {
    const cursor = editor.getLastCursor();
    const bufferPosition = cursor.getBufferPosition();
    const scopeDescriptor = cursor.getScopeDescriptor();
    const line = editor.getTextInRange([
      [bufferPosition.row, 0],
      bufferPosition,
    ]);
    const prefixMatch =
      /(\b|['"~`!@#$%^&*(){}[\]=+,/?>])((\w+[\w-]*)|([.:;[{(< ]+))$/.exec(line);
    const prefix = prefixMatch ? prefixMatch[2] : "";
    return provider.getSuggestions({
      editor,
      bufferPosition,
      scopeDescriptor,
      prefix,
    });
  }

  beforeEach(() => {
    waitsForPromise(() =>
      atom.packages.activatePackage("autocomplete-tailwindcss"),
    );
    waitsForPromise(() => atom.workspace.open("test.html"));

    runs(() => {
      editor = atom.workspace.getActiveTextEditor();
      provider = atom.packages
        .getActivePackage("autocomplete-tailwindcss")
        .mainModule.provide();
    });
  });

  it("returns no completions when current project does not have tailwind installed", () => {
    provider.isTailwindProject = false;

    editor.setText('<div class="bg-bla');
    editor.setCursorBufferPosition([0, 19]);
    expect(getCompletions().length).toBe(0);
  });

  it("returns no completions when not at the start of the class attribute", () => {
    provider.isTailwindProject = true;
    editor.setText("");
    expect(getCompletions().length).toBe(0);
  });

  it("returns no completions when in another attribute", () => {
    provider.isTailwindProject = true;

    editor.setText('<div style="bg-bla');
    editor.setCursorBufferPosition([0, 19]);
    expect(getCompletions().length).toBe(0);
  });

  it("autocompletes html class attribute", () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="bg-bla');
    editor.setCursorBufferPosition([0, 19]);

    const completions = getCompletions();
    expect(completions.length).toBe(22);
    expect(completions[0].text).toContain("bg-black");
    expect(completions[0].rightLabel).toContain(
      "--tw-bg-opacity: 1; background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));",
    );
    expect(completions[0].leftLabelHTML).toBe(
      '<div style="background-color: rgb(0 0 0 / 1)" class="tailwind__color-preview"></div>',
    );
  });

  it("autocompletes @apply at-rule", () => {
    provider.isTailwindProject = true;

    editor.setText("@apply font-sa");
    editor.setCursorBufferPosition([0, 14]);

    expect(getCompletions().length).toBe(1);
  });

  it("autocompletes html className attribute", () => {
    provider.isTailwindProject = true;

    editor.setText('<div className="font-sa');
    editor.setCursorBufferPosition([0, 23]);

    expect(getCompletions().length).toBe(1);
  });

  it("autocompletes with starting dash", () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="-');
    editor.setCursorBufferPosition([0, 14]);

    expect(getCompletions()[0].text).toBe("-backdrop-hue-rotate-0");
  });

  it("autocompletes with a slash", () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="bg-sky-500/');
    editor.setCursorBufferPosition([0, 24]);

    expect(getCompletions()[0].text).toBe("bg-sky-500/0");
  });

  it("does not show preview colors if there are no colors", () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="justify-c');
    editor.setCursorBufferPosition([0, 22]);

    expect(getCompletions()[0].text).toBe("justify-center");
    expect(getCompletions()[0].leftLabelHTML).toBeUndefined();
  });

  it("shows preview colors with rgb()", () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="bg-sky-5');
    editor.setCursorBufferPosition([0, 21]);

    expect(getCompletions()[0].text).toBe("bg-sky-50");
    expect(getCompletions()[0].leftLabelHTML).toBe(
      '<div style="background-color: rgb(240 249 255 / 1)" class="tailwind__color-preview"></div>',
    );
  });

  it("shows preview colors with hex notation", () => {
    provider.isTailwindProject = true;

    editor.setText('<div class="fill-teal-6');
    editor.setCursorBufferPosition([0, 24]);

    expect(getCompletions()[0].text).toBe("fill-teal-600");
    expect(getCompletions()[0].leftLabelHTML).toBe(
      '<div style="background-color: #0d9488" class="tailwind__color-preview"></div>',
    );
  });
});
