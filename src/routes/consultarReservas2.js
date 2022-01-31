const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/consultarReservas2",(req,res)=>{
    const {correo_Electronico,pendiente}=req.body
    const values=[correo_Electronico,pendiente]
    console.log(values);
    mysqlConecction.query("select * from versolicitudes where correo_Electronico=? and confirmacion=?",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
