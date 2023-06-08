import { Router } from 'express';
import session from 'express-session'
import { authentification } from '../controllers/login.controllers.js';
import {createPost, deletePost, getPosts} from '../controllers/index.controllers.js'

import {pool} from '../../database/db.js'


const router = Router();

router.get('/', getPosts)

router.post('/', createPost)
 
router.get('/:id', deletePost);

export default router;