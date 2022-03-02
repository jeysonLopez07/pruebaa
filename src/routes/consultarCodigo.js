const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;

router.put("/consultarCodigo",(req,res)=>{
   const {institucion,codigo}=req.body
   const values=[institucion,codigo]
    mysqlConecction.query("select * from consultacodigo where nombre_Institucion=? and Codigo=?",values,(err,rows,fields)=>{
        if(!err){
            let mensaje=[]
            if(rows.length===0){
                mensaje=["Incorrecto"]
                res.json(mensaje);
            }else{
                mensaje=["Correcto"]
                res.json(mensaje);
            }
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
