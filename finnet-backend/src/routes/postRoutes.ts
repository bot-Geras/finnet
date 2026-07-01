import {Router} from 'express';
import { getPostsByUserId, createPost } from '../controllers/postController';
import { validateCreatePost, validateUserId } from '../middleware/validation';

const router = Router();

router.get('/:userId/posts', validateUserId, getPostsByUserId);
router.post('/:userId/posts', validateUserId, validateCreatePost, createPost);

export default router;