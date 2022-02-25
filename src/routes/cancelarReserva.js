const express = require("express")
const router=express.Router();
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



router.put("/cancelarReserva",cors(corsOptions),(req,res)=>{
   const {id}=req.body
   let respuesta=[]
    mysqlConecction.query("update solicitud_reserva set confirmacion='Cancelada' where id_Solicitud=?",id,(err,rows,fields)=>{
        if(!err){
            respuesta="Cancelado"
            res.json(respuesta);
        }else{
            respuesta="Nocancelado"
            console.log(err);
            res.json(respuesta);
        }
    });
    
});
module.exports=router;
