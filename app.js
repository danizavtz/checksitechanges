const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();
app.disable('x-powered-by');
cors({ credentials: true, origin: true });
app.use(cors());
require('dotenv').config()

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

app.use('/', require('./server/index'));

// após tentar casar todas as rotas a ultima rota que sobrou é not found
app.get('*', (req, res) => {
    res.status(404).json({ errors: [{ msg: 'Não encontrado' }] });
});

module.exports = app;
