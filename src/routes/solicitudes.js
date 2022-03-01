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


router.put("/solicitudes",cors(corsOptions),(req,res)=>{
    const {rol}=req.body;
    console.log(rol);
    if(rol==="Administrador DataCenter"){
        mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Data Center' ORDER BY id_Solicitud ASC",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador Torre 1"){
        mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Torre 1'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador Torre 2"){
        mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Torre 2'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador CBB"){
        mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='CBB'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador ZonaDescarga"){
        mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Torre 2' and nombre_Sala='Zona de Descarga' ",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador Plazas"){
        mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Plaza'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }

    else if(rol==="Administrador CBC"){
        mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='CBC'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }
    
});
module.exports=router;
