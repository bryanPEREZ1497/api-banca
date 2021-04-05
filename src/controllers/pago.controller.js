const pool = require('../models/database.connection');

const pago = {};

pago.devolverPagos = async (req, res) => {
    const pagos = await pool.query('SELECT * FROM servicios_bancarios.pagos');
    console.log(pagos);
    res.json(pagos.rows);
}

pago.hacerPago = async (req, res) => {
    try {
        const { fecha, servicio, monto, cuenta_a_debitar } = req.body;
        if (fecha && servicio && monto && cuenta_a_debitar) {
            await pool.query('BEGIN');
            await pool.query(
                'INSERT INTO servicios_bancarios.pagos(fecha, servicio, monto,cuenta_a_debitar) VALUES ($1,$2,$3,$4)',
                [fecha, servicio, monto, cuenta_a_debitar]
            );
            await pool.query('UPDATE servicios_bancarios.cuentas SET saldo=saldo-$1 WHERE nro_cuenta=$2', [monto, cuenta_a_debitar]);

            await pool.query('COMMIT');


            res.json({
                mensaje: 'Pago exitoso',
                hecho: true
            });
        }
        res.json({
            mensaje: 'El Pago falló. No todos los campos están completos',
            hecho: false
        });

    }
    catch (err) {
        await pool.query('ROLLBACK');
        console.log(`Ocurrió un error. Rollback ejecutado: ${err}`);
    }
}

module.exports = pago;