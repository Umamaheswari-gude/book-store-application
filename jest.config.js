module.exports = {
  preset: "ts-jest",               
  testEnvironment: "jsdom",        
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["<rootDir>/src/**/tests/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"], 
  cacheDirectory: "./node_modules/.cache/jest" , 
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.test.{ts,tsx}",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/types/",
    "/src/context",
    "/src/components",
    "/src/styles",
  ]
};



