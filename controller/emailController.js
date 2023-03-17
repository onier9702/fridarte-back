
const { response } = require('express');
const nodemailer = require('nodemailer');

const emailController = (req, res = response) => {

    try {
        const { name, type, celular, email, message, doubt } = req.body;
        let textReserve = `<h4>Nombre Cliente: ${name} \n <p>Celular: ${celular} </p> \n <p> Correo: ${email} </p> \n <p> Seleccion: ${type} </p> \n <p> Mensaje de Reserva: ${message} </p> </h4>`
        let textDoubt = `<h4>Correo del Cliente: ${email} \n <p>Duda: ${doubt}</p> </h4>`;

        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        
        const mailOptions = {
            from: 'onier0217@gmail.com', // Sender address
            to: 'fridartestudiooficial@gmail.com', // List of recipients
            subject: (doubt) ? 'Ayuda Web Fridarte' : 'Reserva Cliente Web Fridarte', // Subject line
            text: (doubt) ? 'Ayuda' : 'Reserva Cliente', // Plain text body
            html: (doubt) ? textDoubt : textReserve, // html body
        };
        
        transport.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    ok: false,
                    msg: 'El correo fallo en la transportacion'
                });
            } else {
                res.status(200).json({
                    ok: true,
                    info
                });
            };
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Ha ocurrido un error, contacte con el Administrador'
        })
    };

};

module.exports = {
    emailController
}

// sendEmail, html other via

// let mailOptions;
// fs.readFile('/index.html', {encoding: 'utf-8'}, function (err, html) {
//     if (err) {
//       console.log(err);
//     } else {
//         mailOptions = {
//             from: 'onier0217@gmail.com',
//             to: 'flaca99rodriguez@gmail.com',
//             subject: 'Sending Html in node mailer',
//             html: html
//         };
   
//         transport.sendMail(mailOptions, function(error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email has been sent: ' + info.response);
//             }
//         });
//     }
// });