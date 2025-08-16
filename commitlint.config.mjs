/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(feat|fix|chore|style|hotfix|docs|refactor|test|init|build)(?:\(([^)]+)\))?(!)?: (.+) \(#\d+\)$/u,
      headerCorrespondence: ['type', 'scope', 'breaking', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'style',
        'hotfix',
        'docs',
        'refactor',
        'test',
        'init',
        'build',
      ],
    ],
    'references-empty': [2, 'never'],
  },
};
