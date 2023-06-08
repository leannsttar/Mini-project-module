import {pool} from '../../database/db.js'
import bcryptjs from 'bcryptjs';
import session from 'express-session';

export const authentification = async (req, res) => {
    try {
        const user = req.body.user;
        const password = req.body.password;

        // const [rows] = await pool.query('SELECT * FROM users WHERE user = ?', [user], async(error, results) => {
        //     if(await results.length == 0 || await results[0].password !== password) {
        //         res.send('usuario o contraseña incorrectos')
        //         console.log(error)
        //     } else {
        //         req.session.loggedin = true;
        //         req.session.name = results[0].name
        //         res.render('index')
        //     }
        // })
        const [rows] = await pool.query('SELECT * FROM users WHERE user = ?', [user])
        if (rows.length <= 0 || rows[0].password !== password) return res.status(404).send('no se pudo');
        req.session.loggedin = true;
        req.session.name = rows[0].name;
        req.session.user_id = rows[0].id_user;
        res.redirect('/')

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}