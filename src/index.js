const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

//settings
app.set('port', 3000);

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require('./routes/transaccion.routes'));
app.use(require('./routes/transferencia.routes'));
app.use(require('./routes/cuenta.routes'));
app.use(require('./routes/pago.routes'));
app.use(require('./routes/cliente.routes'));
app.use(require('./routes/perfil.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});