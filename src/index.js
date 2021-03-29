const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));


app.use(require('./routes/transaccion.routes'));
app.use(require('./routes/transferencia.routes'));
app.use(require('./routes/cuenta.routes'));
app.use(require('./routes/pago.routes'));
app.use(require('./routes/cliente.routes'));
app.use(require('./routes/perfil.routes'));//es decir, persona

app.post('/api/login', (req, res) => {
    // auth user
    const user = { id: 3 };
    const token = jwt.sign({ user }, 'my_secret_key');
    res.json({ token });
});

app.get('/api/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                text: 'protected Response!',
                data
            });
        }
    });
});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log('Server on port 3000');
});