import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  silent: false,
  rootDir: './',
  transform: {
    '^.+\\.ts?$': [
      "ts-jest",
      {
        babelConfig: "babelrc.test.js",
        isolatedModules: true, // https://huafu.github.io/ts-jest/user/config/isolatedModules#example
        tsconfig: "tsconfig.json",
      }
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['**/?(*.)+(spec|test)?(s).+(ts|js)'],
  setupFilesAfterEnv: ['<rootDir>/tests/.setup/after.env.ts'],
  moduleDirectories: ["node_modules"],
  globalSetup: '<rootDir>/tests/.setup/global.ts',
  setupFiles: ['<rootDir>/tests/.setup/before.env.ts'],
  // globalTeardown: '<rootDir>/tests/.setup/teardown.ts',
  testTimeout: 30_000, // 30 sec timeout by jest test
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' + compilerOptions.baseUrl.replace('./', '') }),
    "^axios$": require.resolve("axios"),
  }
};


export default config;
