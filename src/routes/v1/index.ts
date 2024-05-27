import { Router } from 'express';

import home from './home';
import install from './install';
import uninstall from './uninstall';

const router = Router();

router.post('/', home);
router.post('/install', install);
router.post('/uninstall', uninstall);

export default router;
