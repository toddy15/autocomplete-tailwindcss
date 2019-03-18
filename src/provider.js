'use strict';

const completions = require('./completions.json');

module.exports = {
  selector: '.string.quoted',

  getSuggestions (request) {
    const { prefix, bufferPosition, editor } = request;
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);

    if (!line.match(/class|className/i) || prefix.length === 0) {
      return [];
    }

    let suggestions = [];
    let completion, i, len, rightLabel, text;

    for (i = 0, len = completions.length; i < len; i++) {
      [text, rightLabel] = completions[i];

      if (!prefix || text.startsWith(prefix)) {
        completion = {
          replacementPrefix: prefix,
          rightLabel: rightLabel,
          text: text,
          type: 'tailwind'
        };

        if (rightLabel.indexOf('color') >= 0) {
          const result = rightLabel.match(/#[0-9a-f]{3,6}/i);
          const color = result ? result[0] : 'transparent';

          completion.leftLabelHTML = `<div style="background-color: ${color}" class="tailwind__color-preview"></div>`;
        }

        suggestions.push(completion);
      }
    }

    return suggestions;
  }
};
