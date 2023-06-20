const { Router } = require('express');

const { createOrder, success, webhook } = require ('../controllers/Pago.controller');

const routerPago = Router();

routerPago.post('/createorder', createOrder)

routerPago.get('/success', success)
routerPago.get('/failure', (req, res) => res.send('failure'))
routerPago.get('/pending', (req, res) => res.send('pending'))

routerPago.post('/webhook', webhook)

module.exports = routerPago; 