const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/disponibilidad",(req,res)=>{
    const {edificio,sala,dia}=req.body
    const values=[edificio,sala,dia]
    console.log("Edificio: "+edificio+" Nombre de sala: "+sala+ " Dia: "+dia);
    mysqlConecction.query("select hora_Inicio, hora_fin from versolicitudes where edificio=? and nombre_Sala=? and dia=? and confirmacion='Aceptada'",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
            console.log(rows)
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
