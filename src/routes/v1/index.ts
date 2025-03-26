import { Router } from 'express';

import home from './home';
import install from './install';
import uninstall from './uninstall';
import hmacValidatorMiddleware from '@middlewares/hmacValidator';
import parametersMiddleware from '@middlewares/parameters';
import edusignApiMiddleware from '@middlewares/edusignApi';

/**
 * Creates and initializes a new router instance for handling API routes.
 * This router serves as the entry point for version 1 (v1) of the application's API.
 *
 * @constant
 */
const router = Router();

router.post('/', edusignApiMiddleware, hmacValidatorMiddleware, parametersMiddleware, home);
router.post('/install', install);
router.post('/uninstall', hmacValidatorMiddleware, uninstall);

export default router;
