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

router.put("/agregarMantenimiento",cors(corsOptions),(req,res)=>{
   const {nombre,correo}=req.body
    values=[nombre,correo]
    let respuesta=[]
    mysqlConecction.query("insert into correomantenimiento(nombre_Correo,corre) values(?,?)",values,(err,rows,fields)=>{
        if(!err){
            respuesta=["Agregado"]
            res.json(respuesta);

        }else{
            console.log(err);
            respuesta=["Noagregado"]
            res.json(respuesta);
        }
    });
    
});
module.exports=router;
