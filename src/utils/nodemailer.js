import { createTransport } from 'nodemailer';
import config from '../config/config.js';
import { logger } from './logger.js';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.USER_MAILADMIN,
        pass: config.PASS_MAILADMIN
    }
});




const mailOptionsNewUser = (addressee, user) => {
    
    return {
        from: 'Servidor Node.js',
        to: addressee === 'admin' ?  config.USER_MAILADMIN : user.email,
        subject: 'Nuevo Usuario',
        html:
        `<h1 style="color: blue;">${addressee === 'admin' ? 'Nuevo usuario registrado' : 'Te registraste correctamente'}</h1>'
        <div>
            <ul>
                <li>NOMBRE: <span style="color: green;"> ${user.nombre}</span></li>
                <li>DIRECCION: <span style="color: green;">${user.direccion}</span></li>
                <li>EDAD: <span style="color: green;">${user.edad}</span></li>
                <li>TELEFONO: <span style="color: green;">${user.phone}</span></li>
                <li>EMAIL: <span style="color: green;">${user.email}</span></li>
            </ul>
        </div>`
    }

}


export const sendMailNewUser = async ( newUser ) => {

    try {
        /* const infoAdmin = await transporter.sendMail( mailOptionsNewUser('admin', newUser))
        const infoNewUser = await transporter.sendMail(mailOptionsNewUser('user', newUser))
        logger.info('mail enviado al Admin' , infoAdmin)
        logger.info('mail enviado al nuevo usuario' , infoNewUser)

        console.log( 'mailOptionsNewUser', mailOptionsNewUser('admin', newUser)) */



    } catch (err) {
        logger.error(err)
    }

}

const mailOptionsNewCart = (addressee , nombre , email , total, lista ) => {
    return  {
    from: 'Servidor Node.js',
    to:  addressee === 'admin' ?  config.USER_MAILADMIN : email,
    subject: addressee === 'admin' ?  'Nuevo pedido de ' + nombre : 'Pedido realizado con exito',
    html: `<h1 style="color: blue;"> Nueva compra del usuario: <span style="color: green;"> ${email} </span></h1><div><ul>`
    + lista + `<h2>Total $ ${total} </h2></ul><div>`
    }
   
}


export const sendMailNewCart = async ( nombre, email, cart ) => {

    let listaProductosCarrito = '<h3>Mi Carrito</h3>'
        cart.productos.forEach(element => {
            listaProductosCarrito +=`<li>${element.title}   $${element.price} x ${element.cantidad}</li>`
            });

    try {

        const infoAdmin = await transporter.sendMail(mailOptionsNewCart('admin', nombre, email, cart.total, listaProductosCarrito))
        const infoUser = await transporter.sendMail(mailOptionsNewCart('user', nombre, email, cart.total, listaProductosCarrito))
        logger.info('mail enviado al Admin' , infoAdmin)
        logger.info('mail enviado al Usuario' , infoUser)

        console.log( mailOptionsNewCart , mailOptionsNewCart('admin', nombre, email, cart.total, listaProductosCarrito) )

    } catch (err) {
        logger.error(err)
    }

}



