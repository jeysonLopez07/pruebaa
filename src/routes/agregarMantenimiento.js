const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/agregarMantenimiento",(req,res)=>{
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
