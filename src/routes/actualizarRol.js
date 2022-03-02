const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;
const { query } = require("express");





router.put("/actualizarRol",(req,res)=>{
    const {nuevoR,nombre_Usuario}=req.body
    console.log(nuevoR)
    let respuesta=[]
    mysqlConecction.query("select id_rol from roles where nombre_Rol=?",nuevoR,(err,rows,fields)=>{

        if(!err){
            let codigo=rows[0].id_rol;
            console.log(codigo)
            mysqlConecction.query("select id_Usuario from usuario where correo_Electronico=?",nombre_Usuario,(err,rows,fields)=>{
                if(!err){
                    let codigoUsuario=rows[0].id_Usuario
                    mysqlConecction.query("select id_Usuario_Roles from usuarios_roles where id_Usuario=?",codigoUsuario,(err,rows,fields)=>{
                        if(!err){
                            let codigoregistro=rows[0].id_Usuario_Roles
                            const value=[codigo,codigoregistro]
                           
                            mysqlConecction.query("update usuarios_roles set id_rol=? where id_Usuario_Roles=?",value,(err,rows,fields)=>{
                                if(!err){
                                    respuesta="Actualizado"
                                    res.json(respuesta);
                                }else{
                                    console.log(err);
                                    respuesta="NoActualizado"
                                    res.json(respuesta);
                                }
                            });
            
                        }else{
                            console.log(err);
                        }
                    });


                }else{
                    respuesta="NoActualizado"
            res.json(respuesta);
                    console.log(err);
                }
            });

        }else{
            respuesta="NoActualizado"
            res.json(respuesta);
            
            console.log(err);
        }
    });
    
});
module.exports=router;