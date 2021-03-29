const pool = require('../models/database.connection');

const transaccion = {};
transaccion.devolverTransacciones = async (req, res) => {
    const transacciones = await pool.query('SELECT * FROM servicios_bancarios.transacciones');    
    res.json(transacciones.rows);
}

module.exports = transaccion;

