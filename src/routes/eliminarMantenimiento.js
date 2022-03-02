const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/eliminarMantenimiento",(req,res)=>{
    console.log("Llega");
    const {correoSelect}=req.body
    let respuesta=[]

    mysqlConecction.query("select id_correomantenimiento from correomantenimiento where corre=?",correoSelect,(err,rows,fields)=>{
        if(!err){
            const codigo=rows[0].id_correoMantenimiento
            mysqlConecction.query("delete from correomantenimiento where id_correoMantenimiento=?",codigo,(err,rows,fields)=>{
                if(!err){
                    respuesta=["Agregado"]
                    res.json(respuesta);
        
                }else{
                    console.log(err);
                    respuesta=["Noagregado"]
                    res.json(respuesta);
                }
            });        

        }else{
            console.log(err);
            respuesta=["Noagregado"]
            res.json(respuesta);
        }
    });
    
});
module.exports=router;
