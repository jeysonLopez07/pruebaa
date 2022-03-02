const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/instituciones",(req,res)=>{
    const {nombre}=req.body
    mysqlConecction.query("select nombre_Institucion from instituciones_edificios where nombre_Edificio=?;",nombre,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
