/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type {Config} from '@jest/types';
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir:"test",
  globals: {
    "ts-jest": {
        tsconfig: "./tsconfig.test.json"
    }
}
};

export default config