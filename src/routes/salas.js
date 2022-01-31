const express = require("express")
const router=express.Router();


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
