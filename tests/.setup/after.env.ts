import { Environment } from '@appTypes/environment/envs';
//Forcing NODE_ENV to test for override the default value
process.env.NODE_ENV = Environment.TEST;

import { expect, beforeAll, afterAll } from '@jest/globals';
import * as matchers from 'jest-extended';
import logger from '@logger';

// Importation of librairies mocks
import '@tests/mocks/librairies/edusignApi.mock';
expect.extend(matchers);

beforeAll(async () => {
    
});

afterAll(() => {
    // Terminaison de la connexion à la DB à la fin des tests
    logger.debug('Tests ended\n');
});