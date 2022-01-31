const express = require("express")
const { send, jsonp } = require("express/lib/response");
const res = require("express/lib/response");
const router=express.Router();
const nodemailer = require("nodemailer");


const mysqlConecction=require('../database');

router.delete("/rechazar",(req,res)=>{
    const {rechazada,id,edificio,nombre,dia,inicio,fin,comentario,correo_Electronico}=req.body
    const values=[rechazada,id,edificio,nombre,dia,inicio,fin]
    const values2=[id,comentario]
    mysqlConecction.query("update solicitud_Reserva set confirmacion=? where id_Solicitud=? ",values,(err,rows,fields)=>{
        if(!err){
            mysqlConecction.query("insert into comentario_Solicitud(id_Solicitud,comentario)  values(?,?)",values2)
            let transporte = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "jeysonherreralopez@gmail.com", // generated ethereal user
                    pass: "ewjeezqokibawnff", // generated ethereal password
                },
            });

            var mailOption={
                from: '"Confirmación de Reserva de Sala 👻" <jeysonherreralopez@gmail.com>', // sender address
                to: correo_Electronico, // list of receivers
                subject: "Solicitud Reserva de Salas ✔", // Subject line
                html:"<h4>Su Solicitud de Reserva de Sala fue Rechazada</h4>"+
                      "<table border="+"1"+"><tr class="+"background-color:lightblue"+"><th>Edificio</th><th>Nombre de Sala</th><th>Día de reserva</th><th>Hora de Inicio</th><th>Hora de Finalización</th></tr>"+
                      "<tr><td>"+edificio+"</td><td>"+nombre+"</td><td>"+dia+"</td><td>"+inicio+"</td><td>"+fin+"</td></tr></table>" 
              }

              transporte.sendMail(mailOption,(error,info)=>{
                if(error){
                    res.status(500).send(error.message);
                }else{
                    console.log("Email enviado 3.");
                    res.status(200).jsonp(req.body);
                }
            })



        }else{
            console.log(err);
        }
    });

    
});
module.exports=router;