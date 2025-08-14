export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'style', 'hotfix', 'docs', 'refactor', 'test', 'init', 'build'],
    ],
  },
};
