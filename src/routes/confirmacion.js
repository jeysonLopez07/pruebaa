
const imagen=require('dotenv').config({path:"../views/logoOperadora.png"})
const express = require("express");
const { send, jsonp } = require("express/lib/response");
const res = require("express/lib/response");
const router=express.Router();
const nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');


const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
require('dotenv').config()
const frontend=process.env.FRONTEND;
const cors = require('cors');
const { required } = require("nodemon/lib/config");
const { path } = require('express/lib/application');


router.post("/confirmacion",(req,res)=>{
    const {nombre,apellido,nombreUsuario,correo}=req.body
    
    const url="http://localhost:3000/"

    console.log("LLEG¿A A PLANTILLA")
    console.log(correo)

    let transporte = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "jeysonherreralopez@gmail.com", // generated ethereal user
          pass: "ewjeezqokibawnff", // generated ethereal password
          
        },
        
      });

      transporte.use('compile',hbs({
        viewEngine:'express-handlebars',
        viewPath:'../views/'
      }))
      
      var mailOption={
        from: '"Reserva de Salas 👻" <jeysonherreralopez@gmail.com>', // sender address
        to: correo, // list of receivers
        subject: "Creación de cuenta ✔", // Subject line
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                body{
                    padding: 0px;
                    margin:0px;
                    font-family: Arial, Helvetica, sans-serif;
                }
        
                .container{
                    display: flex;
                    justify-content: center;
                }
        
                header .container-center{
                    margin-top: 10px;
                    text-align: end;
                    font-size: 40px;
                    width: 60vw;
                    height: 150px;
                }
        
        
                header .container-right{
                    margin-top: 10px;
                    width: 40vw;
                    font-size: 40px;
                    text-align: end;
                }
        
                .imagen{
                    width: 300px;
                    height: 150px;
                    margin-right: 20px;
                }
        
                main p{
                    margin-left: 10px;
                    margin-right: 10px;
                    text-align: center;
                    font-size: 30px;
                }
        
                section{
                    margin-left: 10px;
                    margin-right: 10px;
                    text-align: center;
                    
                }
                section p{
                 font-size:25px ;
                }
            
            
                footer{
                    text-align: center;
                 
                }
                a{
                    font-size: 20px;
                    color: white;
                    text-decoration: none;
                }
        
                button{
                    background-color: #2ECC71;
                }
            </style>
        </head>
        <body>
            <header>
                <div class="container">
                    <div class="container-center"><p>¡Te damos la bienvenida ${nombre +" "+ apellido}!</p></div>
                </div>
        </header>
        <main>
            <p>Tu cuenta en el sistema de Reserva de Sala de la OCC con el Correo. ${correo} fue Creada</p>
        </main>
        <section>
            <p class="">Gracias por crear una nueva cuenta. Con ella podrás crear y darle seguimiento a las solicitudes de reservas en las diferentes salas pertenecientes a los edificios del centro cívico. </p>
        </section>      
        <a href=${url}></a>      
        </body>
        </html>`
      };
    
     transporte.sendMail(mailOption,(error,info)=>{
         if(error){
             res.status(500).send(error.message);
         }else{
             console.log("Email enviado.");
             res.status(200).jsonp(req.body);
         }
     })

});
module.exports=router;
 
