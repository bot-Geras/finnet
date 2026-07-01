import {Router} from 'express';

import { getUsers, getUserById } from '../controllers/userController';
import {validateUserId} from '../middleware/validation';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);

export default router;