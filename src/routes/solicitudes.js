const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/solicitudes",(req,res)=>{
    const {correorol}=req.body;
    let rol=""

    mysqlConecction.query("SELECT nombre_Rol FROM VistaRoles where correo_Electronico=?",correorol,(err,rows,fields)=>{
        if(!err){
            console.log(rows[0].nombre_Rol)
             rol=rows[0].nombre_Rol
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
                 mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Torre 1' ORDER BY id_Solicitud ASC",(err,rows,fields)=>{
                     if(!err){
                         res.json(rows);
                     }else{
                         console.log(err);
                     }
                 });
             }else if(rol==="Administrador Torre 2"){
                 mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Torre 2' ORDER BY id_Solicitud ASC",(err,rows,fields)=>{
                     if(!err){
                         res.json(rows);
                     }else{
                         console.log(err);
                     }
                 });
             }else if(rol==="Administrador CBB"){
                 mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='CBB' ORDER BY id_Solicitud ASC",(err,rows,fields)=>{
                     if(!err){
                         res.json(rows);
                     }else{
                         console.log(err);
                     }
                 });
             }else if(rol==="Administrador ZonaDescarga"){
                 mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Torre 2' and nombre_Sala='Zona de Descarga' ORDER BY id_Solicitud ASC ",(err,rows,fields)=>{
                     if(!err){
                         res.json(rows);
                     }else{
                         console.log(err);
                     }
                 });
             }else if(rol==="Administrador Plazas"){
                 mysqlConecction.query("SELECT * FROM versolicitudes where confirmacion='Pendiente' and edificio='Plaza' ORDER BY id_Solicitud ASC",(err,rows,fields)=>{
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
        }else{

        }
    }
    )    
});
module.exports=router;
