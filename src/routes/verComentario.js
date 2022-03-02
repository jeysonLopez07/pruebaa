const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;



router.put("/verComentario",(req,res)=>{
    const {codigoSC}=req.body

    mysqlConecction.query("select comentario from comentario_solicitud where id_Solicitud=?;",codigoSC,(err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;