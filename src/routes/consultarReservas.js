const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/consultarReservas",(req,res)=>{
    const {correo_Electronico}=req.body
    const values=[correo_Electronico]
    console.log(correo_Electronico);
    mysqlConecction.query("SELECT * FROM versolicitudes WHERE correo_Electronico=? and (confirmacion='Aceptada' || confirmacion='Rechazada' || confirmacion='Cancelada')",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
