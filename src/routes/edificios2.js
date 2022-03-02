const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');

require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.get("/edificios2",(req,res)=>{
   
    mysqlConecction.query("select nombre_Edificio from Edificios;",(err,rows,fields)=>{
        if(!err){
    
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
