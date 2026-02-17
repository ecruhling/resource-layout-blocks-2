/**
 * Converts inline styles attribute to style object
 *
 * @param {string} stringStyles
 * @see https://gist.github.com/goldhand/70de06a3bdbdb51565878ad1ee37e92b
 */
export const convertStylesStringToObject = (stringStyles) =>
    typeof stringStyles === 'string'
        ? stringStyles.split(';').reduce((acc, style) => {
            const colonPosition = style.indexOf(':');

            if (colonPosition === -1) {
                return acc;
            }

            const camelCaseProperty = style
                    .slice(0, colonPosition)
                    .trim()
                    .replace(/^-ms-/, 'ms-')
                    .replace(/-./g, (c) => c.slice(1).toUpperCase()),
                value = style.slice(colonPosition + 1).trim();

            return value ? {...acc, [camelCaseProperty]: value} : acc;
        }, {})
        : {};
