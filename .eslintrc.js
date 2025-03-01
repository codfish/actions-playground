module.exports = {
  extends: ['./node_modules/cod-scripts/eslint.js'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
