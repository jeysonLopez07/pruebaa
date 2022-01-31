const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.get("/cUsuario",(req,res)=>{
    mysqlConecction.query("select correo_Electronico from usuario;",(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
