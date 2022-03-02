const express = require("express")
const router=express.Router();
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;



router.put("/consultarReservas3",(req,res)=>{
    const {correo_Electronico}=req.body
 
    console.log("submit 3"+correo_Electronico);
    const fecha2=new Date()
    var año=fecha2.getFullYear();
    var mes= fecha2.getMonth()+1;
    var dia=fecha2.getDate();
    if(dia<10){
        dia="0"+dia
    }

    if(mes<10){
        mes="0"+mes
    }
    var fecha=año+"-"+mes+"-"+dia;
    console.log(fecha);
    const values=[correo_Electronico,fecha]
    mysqlConecction.query("SELECT * FROM versolicitudes WHERE correo_Electronico=? and dia>=? and (confirmacion='Aceptada' || confirmacion='Pendiente') ORDER BY id_Solicitud ASC",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
