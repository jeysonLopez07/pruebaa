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


router.put("/verComentario",cors(corsOptions),(req,res)=>{
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