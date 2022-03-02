const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/consultarVisitas",(req,res)=>{
    const {id_Solicitudesd}=req.body
    const values=[id_Solicitudesd]
    console.log(id_Solicitudesd);
    mysqlConecction.query("SELECT * FROM mostrarvisitas WHERE id_Solicitud=?",id_Solicitudesd,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;