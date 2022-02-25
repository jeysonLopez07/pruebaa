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

router.put("/consultarCodigo",cors(corsOptions),(req,res)=>{
   const {institucion,codigo}=req.body
   const values=[institucion,codigo]
    mysqlConecction.query("select * from consultaCodigo where nombre_Institucion=? and Codigo=?",values,(err,rows,fields)=>{
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
