const express = require("express")
const router=express.Router();
const { send, jsonp } = require("express/lib/response");
const res = require("express/lib/response");
const nodemailer = require("nodemailer");
const mysqlConecction=require('../database');

require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;
const cors = require('cors');
var whiteList=[`${frontend}`]

var corsOptions={
    origin: function(origin,callback){
        if(whiteList.indexOf(origin)!==-1){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}

router.delete("/cancelar",cors(corsOptions),(req,res)=>{
    const {correo,cancelar,id,edificio,nombre,dia,inicio,fin}=req.body
    const values=[cancelar,id,edificio,nombre,dia,inicio,fin]
    let CorreoEnviar=[]
    let correoAdmin="";
    if (edificio === "Torre1") {
      correoAdmin = "Administrador Torre 1";
    } else if (edificio === "Torre 2") {
      correoAdmin = "Administrador Torre 2";
    } else if (edificio === "CBB") {
      correoAdmin = "Administrador CBB";
    } else if (edificio === "CBC") {
      correoAdmin = "Administrador CBC";
    } else if (edificio === "Data Center") {
      correoAdmin = "Administrador DataCenter";
    } else if (edificio === "Torre 2" && nombre==="Zona de Descarga") {
      correoAdmin = "Administrador ZonaDescarga";
    }
      else if (edificio === "Plaza") {
        correoAdmin = "Administrador Plazas";
    }


  
    mysqlConecction.query("select correo_Electronico from administrador where nombre_Rol=?",correoAdmin,(err,rows,fields)=>{

        for(let i=0;i<rows.length;i++){
          CorreoEnviar.push(rows[i].correo_Electronico)
        }

    })
    mysqlConecction.query("update solicitud_reserva set confirmacion=? where id_Solicitud=? ",values,(err,rows,fields)=>{
        if(!err){
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
                from: '"Reserva de Sala Cancelada" <jeysonherreralopez@gmail.com>', // sender address
                to: correo+","+CorreoEnviar, // list of receivers
                subject: "Solicitud Reserva de Salas ✔", // Subject line
                html:"<h4>Su Solicitud de Reserva de Sala fue Cancelada</h4>"+
                      "<table border="+"1"+"><tr class="+"background-color:lightblue"+"><th>Edificio</th><th>Nombre de Sala</th><th>Día de reserva</th><th>Hora de Inicio</th><th>Hora de Finalización</th></tr>"+
                      "<tr><td>"+edificio+"</td><td>"+nombre+"</td><td>"+dia+"</td><td>"+inicio+"</td><td>"+fin+"</td></tr></table>" 
              }

              transporte.sendMail(mailOption,(error,info)=>{
                if(error){
                    res.status(500).send(error.message);
                }else{
                    console.log("Email enviado 2.");
                    res.status(200).jsonp(req.body);
                }
            })
        }else{
            console.log(err);
        }
    });

    
});
module.exports=router;