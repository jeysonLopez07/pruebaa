const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.get("/area",(req,res)=>{
   
    mysqlConecction.query("select nombre_Are from areas_Trabajo;",(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
