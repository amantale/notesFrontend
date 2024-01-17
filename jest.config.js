// jest.config.js
module.exports = {
    transform: {
      '^.+\\.mjs$': 'babel-jest',
      '^.+\\.tsx$': 'ts-jest',
    },
    presets: ['@babel/preset-env'],
  };
  