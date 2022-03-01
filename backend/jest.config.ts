/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type {Config} from '@jest/types';
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir:"app/__test__",
  setupFilesAfterEnv:['./test-setup.js']
};

export default config