const pool = require('../models/database.connection');

const cliente = {};

cliente.devolverClientes = async (req, res) => {
    const clientes = await pool.query('SELECT * FROM servicios_bancarios.clientes');
    res.json(clientes.rows);
}

cliente.devolverCuentasDeCliente = async (req, res) => {
    const { id } = req.params;
    const cuentas = await pool.query('SELECT * FROM servicios_bancarios.cuentas WHERE id_cliente=$1', [id]);
    res.json(cuentas.rows);
}

cliente.mostrarMovimientosDeCuenta = async (req, res) => {
    
    const { numero } = req.params;
    numeroCuenta = numero.toString();
    const movimientos = await pool.query(
        'SELECT t.fecha, ct.valor, dt.monto FROM servicios_bancarios.cuentas c JOIN servicios_bancarios.transacciones t ON t.nro_cuenta=c.nro_cuenta JOIN catalogo ct ON ct.id = t.tipo_transaccion JOIN servicios_bancarios.detalle_transaccion dt ON dt.transaccion=t.id WHERE c.nro_cuenta=$1',
        [numeroCuenta]
    );
    res.json(movimientos.rows);

}

cliente.mostrarDatosDePerfil = async (req, res) => {
    const { id } = req.params;
    const persona = await pool.query('SELECT * FROM personas ');
    res.json(persona.rows);
}

module.exports = cliente;


