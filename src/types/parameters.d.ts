export interface StandardAppParameter {
  ID: number,
  NAME: string,
  APP_ID: string,
  SCHOOL_ID: string,
  VALUE: string,
  TYPE: string,
  OPTIONS: string,
}

export type AppParameter = Omit<StandardAppParameter, 'NAME'>;

export interface AppParameters {
  ExampleParameter: AppParameter,
}
