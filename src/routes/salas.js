const express = require("express")
const router=express.Router();
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;
console.log(frontend)


const mysqlConecction=require('../database');

router.get("",(req,res)=>{
    mysqlConecction.query("SELECT * FROM Salas",(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
