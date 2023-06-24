const mercadopago = require('mercadopago');
require('dotenv').config()
const {productoActualizado} = require('./Productos/index.js');
const {enviarNotificacionPorCorreo} = require('../../../client/src/hooks/enviarCorreo.js')
const {UsuarioActualizado} = require('./Usuarios/usuarioActualizado.js');
const getUsuarioById = require('./Usuarios/usuariosById.js')
const allUsuario = require('./Usuarios/usuarios.js');

const { KEYMERCADOPAGO } = process.env;
var body;
const createOrder = async (req, res) => {
    const { precio} = req.body; 
    
    body = req.body
    mercadopago.configure({
        access_token: KEYMERCADOPAGO
    })
    const result = await mercadopago.preferences.create({
        
        items: [
            {
                title: "Productos del carrito",
                currency_id: 'ARS',
                quantity: 1,
                unit_price: precio,
            }
        ],
        
        back_urls: {
            success: `http://localhost:3001/pago/success`,
            failure: "http://localhost:3001/pago/failure",
            pending: "",
        },
        notification_url: 'https://011b-200-115-58-192.sa.ngrok.io/webhook'
    })
    
    return res.send(result.body)
}


const success = async(req, res) => {
    const {usuario, precio, cartItems} = body;

    cartItems.forEach(element => {
        productoActualizado(element._id,{stock:element.stock-element.quantity})
    });

    const fecha = new Date();

    const object = {valor:precio, fecha};
    const user = await getUsuarioById(usuario._id)
    await UsuarioActualizado(usuario._id, {comprado:[...user.comprado,object]})
    
    cartItems.forEach(async element => {
        const usuarios = await allUsuario();
        const vendedor = usuarios.find(use =>use.correo === element.categorias[0]);
        await UsuarioActualizado(vendedor._id,{vendido:[...vendedor.vendido,object]});
    });


    const asunto = "Mercado Pago";
    const mensaje = "Su compra se realizó correctamente";
    await enviarNotificacionPorCorreo(usuario.correo,asunto,mensaje)
    res.redirect('http://localhost:3000/home');
};

const failure = (req, res) => {
    res.redirect('http://localhost:3000/home');
  //res.send("HOLA MUNDOOO")
};

const webhook = async (req, res) => {
    const payment = req.query;

    try {
        if(payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
        // console.log(data);
        }
        
        res.sendStatus(204)  
    } catch (error) {
        console.log(error);
        return res.sendStatus(500).json({error: error.message})        
    }

}

module.exports = {createOrder, success, webhook, failure}