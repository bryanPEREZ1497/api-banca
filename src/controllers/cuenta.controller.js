const pool = require('../models/database.connection');

const cuenta = {};

cuenta.devolverCuentas = async (req, res) => {
    const cuentas = await pool.query('SELECT * FROM servicios_bancarios.cuentas');
    res.json(cuentas.rows);
}

cuenta.devolverCuenta = async (req, res) => {
    const { numero } = req.params;
    let numeroCuenta = numero.toString();
    const cuenta = await pool.query('SELECT * FROM servicios_bancarios.cuentas WHERE nro_cuenta=$1', [numeroCuenta]);
    res.json(cuenta.rows);
}

module.exports = cuenta;


