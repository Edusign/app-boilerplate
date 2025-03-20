export enum TableNames {
  APP_CREDENTIALS = 'credentials',
}

export type AppCredential = {
  id: number;
  api_key: string;
  school_id: string;
  client_id: string;
  client_secret: string;
};

export enum AppCredentialColumns {
  ID = 'id',
  API_KEY = 'api_key',
  SCHOOL_ID = 'school_id',
  CLIENT_ID = 'client_id',
  CLIENT_SECRET = 'client_secret',
}