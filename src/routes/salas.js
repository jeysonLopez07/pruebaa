const express = require("express")
const router=express.Router();
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;
console.log(frontend)
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


const mysqlConecction=require('../database');

router.get("",cors(corsOptions),(req,res)=>{
    mysqlConecction.query("SELECT * FROM Salas",(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
