const express = require("express")
const { send, jsonp } = require("express/lib/response");
const res = require("express/lib/response");
const router=express.Router();
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


router.delete("/rechazar",cors(corsOptions),(req,res)=>{
    const {rechazada,id,edificio,nombre,dia,inicio,fin,comentario,correo_Electronico}=req.body
    const values=[rechazada,id,edificio,nombre,dia,inicio,fin]
    const values2=[id,comentario]
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

    if(comentario===null){

    }else{
    mysqlConecction.query("update solicitud_reserva set confirmacion=? where id_Solicitud=? ",values,(err,rows,fields)=>{
        if(!err){
            mysqlConecction.query("insert into comentario_solicitud(id_Solicitud,comentario)  values(?,?)",values2)

            mysqlConecction.query("select correo from correomao",(err,rows,fields)=>{
                if(!err){
                    let correo2=rows[0].correo
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
                        to: correo2,
                        cc:CorreoEnviar, // list of receivers
                        subject: "Solicitud Reserva de Sala Rechazada", // Subject line
                        html:`<!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <style>
                                    
                                    td{
                                        border: solid 1px;
                                        text-align: center;
                                       
                                    }
                                    tbody{
                                        margin-top: 0px;
                                    }
                                    th{
                                        background-color: dodgerblue;
                                        color:white;
                                        border: solid 1px black;
                                    }
                                </style>
                            </head>
                        <body>
                            <h4>Solicitud de Reserva Rechazada</h4>
                            <p>Favor notificar al Usuario con Correo Electronico: ${correo_Electronico} que su Solicitud de Reserva de Sala con los siguientes datos fue Rechazada</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Edificio</th><th>Nombre de Sala</th><th>Día de reserva</th><th>Hora de Inicio</th><th>Hora de Finalización</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${edificio}</td><td>${nombre}</td><td>${dia.substring(0,10)}</td><td>${inicio}</td><td>${fin}</td>
                                    </tr>
                                </tbody>
                            </table>
                        
                            <p>Comentario de Coordinador:</p>
                            <p>${comentario}</p>
                        </body>
                        </html>` 
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

                }
            })


            vacio=["hecho"]
            res.json(vacio);
          



        }else{
            console.log(err);
        }
    });

}
});
module.exports=router;