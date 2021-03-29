const pool = require('../models/database.connection');

const transferencia = {};

transferencia.devolverTransferencias = async (req, res) => {
    const transferencias = await pool.query('SELECT * FROM servicios_bancarios.transferencias');
    res.json(transferencias.rows);
}

transferencia.hacerTransferencia = async (req, res) => {
    try {
        const { beneficiario, benefactor, monto, fecha, motivo } = req.body;
        if (beneficiario && benefactor && monto && fecha && motivo) {
            await pool.query('BEGIN');
            await pool.query(
                'INSERT INTO servicios_bancarios.transferencias(nro_cuenta_beneficiario, nro_cuenta_origen, monto, fecha, motivo) VALUES ($1,$2,$3,$4,$5)',
                [beneficiario, benefactor, monto, fecha, motivo]
            );
            await pool.query(
                'UPDATE servicios_bancarios.cuentas SET saldo=saldo-$1 WHERE nro_cuenta=$2',
                [monto, benefactor]
            );
            await pool.query(
                'UPDATE servicios_bancarios.cuentas SET saldo=saldo+$1 WHERE nro_cuenta=$2',
                [monto, beneficiario]
            );

            await pool.query('COMMIT')
            res.json({
                mensaje: 'Transferencia exitosa'
            });
        }
        res.json({
            mensaje: 'Falló la transaferencia. No todos los campos están completos.'
        })

    }
    catch (err) {
        await pool.query('ROLLBACK');
        console.log(`Hubo un Error. Rollback ejecutado. Transferencia revertirda. ${err}`);
    }
}

module.exports = transferencia;