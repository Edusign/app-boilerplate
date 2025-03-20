import { Environment } from "./envs";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: Environment;
      }
    }
  }