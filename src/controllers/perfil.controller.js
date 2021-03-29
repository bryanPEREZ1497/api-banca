const pool = require('../models/database.connection');

const perfil = {};

perfil.devolverCedula = async (req, res) => {
    const { id } = req.params;
    const cedula = await pool.query('SELECT cedula FROM servicios_bancarios.clientes WHERE id=$1',
        [id]);
    res.json(cedula.rows[0].cedula);
}

perfil.devolverPerfil = async (req, res) => {
    const { cedula } = req.params;
    if (cedula == undefined) {
        console.log('cedula undefined')
        return;
    }
    // const cedulaCliente = cedula.toString();
    const perfil = await pool.query('SELECT * FROM personas WHERE cedula=$1',
        [cedula]);
    res.json(perfil.rows);
}
perfil.devolverPerfilId = async (req, res) => {
    const { id } = req.params;
    const perfil = await pool.query(
        'SELECT p.cedula, p.nombre, p.correo, p.telefono, p.direccion FROM personas p JOIN servicios_bancarios.clientes c ON c.cedula=p.cedula WHERE c.id=$1',
        [id]
    );
    res.json(perfil.rows);
}
perfil.devolverPerfiles = async (req, res) => {
    const perfiles = await pool.query('SELECT * FROM personas');
    res.json(perfiles.rows);
}

perfil.actualizarPerfil = async (req, res) => {
    const { cedula } = req.params;
    const { telefono, correo, direccion } = req.body;
    const perfilActual = [];
    if (telefono && cedula) {
        perfilActual = await pool.query('UPDATE personas SET telefono=$1 WHERE cedula=$2',
            [telefono, cedula]
        );
    }

    if (correo && cedula) {
        perfilActual = await pool.query('UPDATE personas SET correo=$1 WHERE cedula=$2',
            [correo, cedula]
        );
    }

    if (direccion && cedula) {
        perfilActual = await pool.query('UPDATE personas SET direccion=$1 WHERE cedula=$2',
            [direccion, cedula]
        );
    }

    res.json(perfiles.rows);
}

module.exports = perfil;


