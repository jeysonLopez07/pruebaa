const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.get("/edificios",(req,res)=>{
    mysqlConecction.query("select distinct(edificio) from salas",(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
