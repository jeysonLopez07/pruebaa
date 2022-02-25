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


router.put("/consultarSala",cors(corsOptions),(req,res)=>{
const {rol,edificio,nombre,dia,inicio,fin}=req.body;
const values= [edificio,nombre, dia.substring(0,10),inicio,fin]
console.log(rol);
if(rol!=="Usuario"){
    mysqlConecction.query("CALL verificaciónFecha(?,?,?,?,?)",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
            console.log(rows)
            
        }else{
            console.log(err);
        }
    });
}
})

module.exports=router;