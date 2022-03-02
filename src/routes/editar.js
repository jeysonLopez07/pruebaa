const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/editar",(req,res)=>{
    const {nombre,apellido,nombreUsuario,correo,telefono,edificio,narea,nombre_Institucion}=req.body
    let enviar=[]
    mysqlConecction.query("select id_Usuario from usuario where correo_Electronico=?",correo,(err,rows,fields)=>{
        if(!err){
            const id=rows[0].id_Usuario
            mysqlConecction.query("select id_Informacion from informacionusuario where id_Usuario=?",id,(err,rows,fields)=>{
                if(!err){
                    const id_info=rows[0].id_Informacion

                    mysqlConecction.query("select id_Area from areas_trabajo where nombre_Are=?",narea,(err,rows,fields)=>{
                        if(!err){
                            const idArea=rows[0].id_Area
                            const values= [nombre,apellido,nombreUsuario,telefono,idArea,id_info]
                            mysqlConecction.query("update informacionusuario set nombre=?,apellido=?,nombre_Usuario=?,telefono=?,id_Area=? where id_Informacion=?",values,(err,rows,fields)=>{
                                if(!err){
                                enviar=["Actualizado"]                    
                                 res.json(enviar);
                                 console.log("LLEGA HASA AQUI")
                                }else{
                                   enviar=["No"]
                                   res.json(enviar);
                                }
                            });

                        }else{
                            console.log(err);
                        }
                    });



                }else{
                    console.log(err);
                }
            });


        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;