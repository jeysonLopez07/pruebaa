const express = require("express");
const { send, jsonp } = require("express/lib/response");
const res = require("express/lib/response");
const router=express.Router();
const nodemailer = require("nodemailer");
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.post("/correo",(req,res)=>{
 
  const {edificio,nombre,dia,inicio,fin,correo_Electronico}=req.body
  console.log(edificio);
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
      if(!err){

        let CorreoEnviar=[]

        for(let i=0;i<rows.length;i++){
          CorreoEnviar.push(rows[i].correo_Electronico)
        }

        
        console.log(CorreoEnviar)
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
          from: '"Reserva de Salas 👻" <jeysonherreralopez@gmail.com>', // sender address
          to: correo_Electronico +","+CorreoEnviar, // list of receivers
          subject: "Solicitud Reserva de Salas ✔", // Subject line
          html:"<h4>Se Creó una Solicitud de Reserva de Sala</h4>"+
                "<table border="+"1"+"><tr class="+"background-color:lightblue"+"><th>Edificio</th><th>Nombre de Sala</th><th>Día de reserva</th><th>Hora de Inicio</th><th>Hora de Finalización</th></tr>"+
                "<tr><td>"+edificio+"</td><td>"+nombre+"</td><td>"+dia.substring(0,10)+"</td><td>"+inicio+"</td><td>"+fin+"</td></tr></table>" 
        /*"<h4>Se creó una solicitud de reserva<h4>"+
          "<p>En el Edificio: "+edificio+"<p>"+
          "<p>En la sala con Nombre: "+nombre+"<p>"+
           "<p> el Dia: " +dia+"<p>"+
           "<p>Hora de inicio: "+inicio+"<p>"+
           "<p>Hora de Finalizacion: "+fin+"<p>" // html body*/
        }
      
       transporte.sendMail(mailOption,(error,info)=>{
           if(error){
               res.status(500).send(error.message);
           }else{
               console.log("Email enviado.");
               res.status(200).jsonp(req.body);
           }
       })

      }else{
          console.log(err);
      }
  });
  
});
module.exports=router;

