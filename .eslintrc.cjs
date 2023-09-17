module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['jsx-a11y', 'react-hooks'],
  rules: {
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'import/no-anonymous-default-export': ['off'],
    'no-unused-vars': 'off',
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
};
