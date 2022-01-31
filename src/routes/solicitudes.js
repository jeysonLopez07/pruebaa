const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/solicitudes",(req,res)=>{
    const {rol}=req.body;
    console.log(rol);
    if(rol==="Administrador DataCenter"){
        mysqlConecction.query("SELECT * FROM verSolicitudes where confirmacion='Pendiente' and edificio='Data Center'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador Torre 1"){
        mysqlConecction.query("SELECT * FROM verSolicitudes where confirmacion='Pendiente' and edificio='Torre 1'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador Torre 2"){
        mysqlConecction.query("SELECT * FROM verSolicitudes where confirmacion='Pendiente' and edificio='Torre 2'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador CBB"){
        mysqlConecction.query("SELECT * FROM verSolicitudes where confirmacion='Pendiente' and edificio='CBB'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador ZonaDescarga"){
        mysqlConecction.query("SELECT * FROM verSolicitudes where confirmacion='Pendiente' and edificio='Data Center'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }else if(rol==="Administrador Plazas"){
        mysqlConecction.query("SELECT * FROM verSolicitudes where confirmacion='Pendiente' and edificio='Plaza'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }

    else if(rol==="Administrador CBC"){
        mysqlConecction.query("SELECT * FROM verSolicitudes where confirmacion='Pendiente' and edificio='Plaza'",(err,rows,fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.log(err);
            }
        });
    }
    
});
module.exports=router;
