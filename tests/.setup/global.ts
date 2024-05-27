import 'tsconfig-paths/register';

import logger from '@logger';

async function initialize() {
    try {
        logger.debug('Starting tests');
    } catch (error) {
        logger.error('Error during tests initialization', error);
        process.exit(1);
    }
}

export default initialize;