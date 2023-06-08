import {Router} from 'express';
import { sendRegister } from '../controllers/registration.controllers.js';


const router = Router()

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', sendRegister);

export default router;