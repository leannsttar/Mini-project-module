import { Router } from "express";
import { authentification } from "../controllers/login.controllers.js";

const router = Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', authentification);

export default router;