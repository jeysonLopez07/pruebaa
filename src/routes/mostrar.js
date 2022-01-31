const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.get("/mostrar",(req,res)=>{
    mysqlConecction.query("SELECT * FROM verSolicitudes",(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
