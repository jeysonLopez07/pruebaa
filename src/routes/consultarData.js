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


router.put("/consultarData",cors(corsOptions),(req,res)=>{
    const {correo_Electronico}=req.body
    const values=[correo_Electronico]
    console.log(correo_Electronico);
    mysqlConecction.query("SELECT * FROM versolicitudes where Edificio='Data Center' and confirmacion='Aceptada' and correo_Electronico=?",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
