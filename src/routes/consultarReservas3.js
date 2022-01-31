const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/consultarReservas3",(req,res)=>{
    const {correo_Electronico}=req.body
    const values=[correo_Electronico]
    console.log("submit 3"+correo_Electronico);
    mysqlConecction.query("SELECT * FROM versolicitudes WHERE correo_Electronico=? and (confirmacion='Aceptada' || confirmacion='Pendiente')",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
