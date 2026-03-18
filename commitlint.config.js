// commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'build',
          'chore',
          'ci',
          'docs',
          'feat',
          'fix',
          'perf',
          'refactor',
          'revert',
          'style',
          'test',
        ],
      ],
      'subject-case': [2, 'never', ['start-case', 'pascal-case']],
    },
  };

// Example Commit Messages
// - feat: feat: add user login functionality
// - fix: fix: correct login button alignment
// - docs: docs: update API documentation
// - style: style: format code according to eslint rules
// - refactor: refactor: simplify user authentication logic
// - perf: perf: improve database query performance
// - test: test: add tests for login component
// - chore: chore: update dependencies