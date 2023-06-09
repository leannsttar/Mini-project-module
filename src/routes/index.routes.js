import { Router } from 'express';
import session from 'express-session'
import { authentification } from '../controllers/login.controllers.js';
import {createPost, deletePost, editPost, getPosts} from '../controllers/index.controllers.js'

import {pool} from '../../database/db.js'


const router = Router();

router.get('/', getPosts)

router.post('/', createPost)
 
router.get('/:id', deletePost); 

router.post('/edit/:id', editPost)
export default router;