import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session'
import bcryptjs from 'bcryptjs';

import registrationRoutes from './routes/registration.routes.js';
import loginRoutes from './routes/login.routes.js';
import indexRoutes from './routes/index.routes.js'

const app = express();


app.use(express.urlencoded( { extended: false } ));
app.use(express.json());

app.use('/public', express.static('public'));

dotenv.config({path:'./env/.env'})

app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


app.use(registrationRoutes);
app.use(loginRoutes);
app.use(indexRoutes);


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.listen(3000, (req, res) => {
    console.log('Server running on port 3000')
})