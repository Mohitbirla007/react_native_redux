module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
    '|@react-native' +
    '|@react-navigation' +
    '|@react-native-community/push-notification-ios' +
    ')/)',
  ],
  moduleNameMapper: {
    '\\.(png|jpg)$': '<rootDir>/__mocks__/fileMock.js',
  },
   transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
