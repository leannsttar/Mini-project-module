import {pool} from '../../database/db.js'

export const sendRegister = async (req, res) => {
    try {
        const user = req.body.user;
        const name = req.body.name;
        const password = req.body.password;
        await pool.query('INSERT INTO users (user, name, password) VALUES (?, ?, ?)', [user, name, password]);
        res.render('login')
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}