const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/reservasAceptadas",(req,res)=>{
   const {rol}=req.body
   let edificio;

   console.log("Legga")
if(rol==="Administrador Torre 1"){
    edificio="Torre 1"
}else if(rol==="Administrador Torre 2"){
    edificio="Torre 2"
}else if(rol==="Administrador CBB"){
    edificio="CBB"
}else if(rol==="Administrador CBC"){
    edificio="CBC"
}else if(rol==="Administrador DataCenter"){
    edificio="Data Center"
}else if(rol==="Administrador ZonaDescarga"){
    edificio="Torre 2"
}else if(rol==="Administrador Plazas"){
    edificio="Plaza"
}



if(rol==="Administrador ZonaDescarga"){

    nombre="Zona de Descarga"
    values=[edificio,nombre]

    mysqlConecction.query("select * from versolicitudes where confirmacion='Aceptada' and edificio=? and nombre_Sala=?",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });

}else{
    mysqlConecction.query("select * from versolicitudes where confirmacion='Aceptada' and edificio=?",edificio,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
}

    
});
module.exports=router;
