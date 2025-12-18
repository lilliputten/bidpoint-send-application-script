/**
 * Example of correct commit comment: `fix: Issue #1: Test`
 *
 * See:
 *
 * - https://www.conventionalcommits.org/en/v1.0.0/
 * - https://commitlint.js.org/reference/configuration.html
 */

module.exports = {
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['#'],
    },
  },
  rules: {
    'references-empty': [2, 'never'],
  },
};
