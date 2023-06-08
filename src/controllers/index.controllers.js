import {pool} from '../../database/db.js'

export const getPosts = async (req, res) => {
    //Condición si ya ha iniciado sesión
    if (req.session.loggedin) {
        const [rows] = await pool.query('SELECT * FROM posts')
        const [creators] = await pool.query('SELECT * FROM users INNER JOIN posts ON users.id_user = posts.id_user')
        if (rows.length <= 0) return res.status(404).send('no hay posts');
        res.render('index', {
            //enviamos los datos de si el login es true y el nombre del usuario loggeado
            login: true,
            name: req.session.name,
            data: [[rows][0], [creators][0]],
            posts: [rows][0],
            creators: [creators][0]
        })
    } else {
        res.render('index', {
            //Si no está loggeado enviamos que el login es false y el nombre es una advertencia de que debe iniciar sesión
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const title = req.body.title;
        const message = req.body.message;
        const language = req.body.language;
        const id_user = req.session.user_id

        await pool.query('INSERT INTO posts (title, message, language, id_user) VALUES (?, ?, ?, ?)', [title, message, language, id_user]);
        res.redirect('/')
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

// export const deletePost = async (req, res) => {
//     try {
//         console.log(req.body.id_post)
//         const [result] = await pool.query('DELETE FROM posts WHERE id_post = ?', [req.body.id])

//         if (result.affectedRows <= 0) return res.status(404).json({
//             message: 'post not found'
//         })

//         res.redirect('/')
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         })
//     }
// }