import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(lucide-react)/)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^lucide-react$': '<rootDir>/__mocks__/lucide-react.ts',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
