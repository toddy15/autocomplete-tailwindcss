"use babel";

const completions = require("./completions.json");

module.exports = {
  /**
   * @type {string}
   */
  selector:
    ".text.html.erb, .string.quoted, .text.html.basic, .source.pug .constant.language.js, .meta.property-list.css, .meta.property-list.scss",

  /**
   * @type {boolean}
   */
  isTailwindProject: false,

  /**
   * Get the completion suggestions.
   *
   * @param {object} request
   *
   * @return {array}
   */
  getSuggestions(request) {
    if (!this.isTailwindProject) {
      return [];
    }

    let { prefix, bufferPosition, editor, scopeDescriptor } = request;

    if (prefix.length === 0) {
      const character = editor.getTextInRange([
        [bufferPosition.row, bufferPosition.column - 1],
        bufferPosition,
      ]);

      if (character !== "-") {
        return [];
      }

      prefix = character;
    }

    const { scopes } = scopeDescriptor;
    const line = editor.getTextInRange([
      [bufferPosition.row, 0],
      bufferPosition,
    ]);

    if (
      !line.match(/@apply/i) &&
      !line.match(/class|className/i) &&
      !scopes.includes("source.pug")
    ) {
      return [];
    }

    const suggestions = [];

    for (const [text, rightLabel] of completions) {
      if (!prefix || text.startsWith(prefix)) {
        const completion = {
          replacementPrefix: prefix,
          rightLabel: rightLabel,
          text: text,
          type: "tailwind",
        };

        // Match colors using rgb() or #bad123
        let color = "";
        let result = rightLabel.match(/rgb\([0-9]{1,3} [0-9]{1,3} [0-9]{1,3}/i);
        if (result) {
          color = result[0] + " / 1)";
        } else if ((result = rightLabel.match(/#[0-9a-f]{6}/i))) {
          color = result[0];
        }

        if (color !== "") {
          completion.leftLabelHTML = `<div style="background-color: ${color}" class="tailwind__color-preview"></div>`;
        }

        suggestions.push(completion);
      }
    }

    return suggestions;
  },
};
