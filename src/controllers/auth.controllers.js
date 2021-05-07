const pool = require('../models/database.connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = {};
auth.signUp = async (req, res) => {
    const { email, password, roles } = req.body;
    const passwordEncrypted = await encryptPassword(password);
    //save user
    await pool.query(
        'INSERT INTO auditoria.usuario(login,clave) VALUES ($1,$2)',
        [email, passwordEncrypted]
    );
    //look for the new user to save his id
    const userId = await pool.query(
        'SELECT id FROM auditoria.usuario WHERE login=$1',
        [req.body.email]
    );
    //save roles into table usuario_rol
    if (roles) {
        for (const rol of roles) {
            let idRol = await pool.query('SELECT id FROM auditoria.rol WHERE nombre=$1', [rol]);
            await pool.query(
                'INSERT INTO auditoria.usuario_rol(id_usuario,id_rol) VALUES ($1,$2)',
                [userId, idRol]
            );
        }
    }
    else {
        const role = await pool.query('SELECT id FROM auditoria.rol WHERE nombre=$1', ['user']);
        await pool.query(
            'INSERT INTO auditoria.usuario_rol(id_usuario,id_rol) VALUES ($1,$2)',
            [userId, role]
        );
    }
    //save user id inside token 
    const token = jwt.sign({ id: userId }, 'bank', {
        expiresIn: 800
    });
    res.json({ token });
}
auth.signIn = async (req, res) => {
    //look for the user
    const userFound = await pool.query(
        'SELECT * FROM auditoria.usuario WHERE login=$1',
        [req.body.email]
    );

    if (!userFound.rows) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await comparePassword(
        req.body.password,
        userFound.rows[0].clave
    );

    if (!matchPassword)
        return res.status(401).json({
            token: null,
            message: "Invalid Password",
        });

    const token = jwt.sign({ id: userFound.rows[0].id }, 'bank', {
        expiresIn: 86400, // 24 hours
    });
    res.json({ token });
}
const encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
const comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}
module.exports = auth;