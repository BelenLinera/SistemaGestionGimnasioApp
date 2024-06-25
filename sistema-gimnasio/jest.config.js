// module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   };


// module.exports = {
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   transform: {
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
//   moduleNameMapper: {
//     '\\.(css|less)$': 'identity-obj-proxy',
//   },
//   testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
// };


// module.exports = 
// {
//   "jest": {
//     "transform": {
//       "^.+\.jsx?$": "babel-jest"
//     }
//   }
// }
module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  
};