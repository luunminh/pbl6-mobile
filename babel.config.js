module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
          alias: {
            "@components": 'src/components',
            "@shared": 'src/shared',
            "@queries": 'src/queries',
            "@types": 'src/types',
            "@redux": 'src/redux',
            "@appConfig": 'src/appConfig',
          },
        },
      ],
    ],
  };
};
