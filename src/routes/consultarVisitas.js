const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/consultarVisitas",(req,res)=>{
    const {id,id_Solicitudesd}=req.body
    const values=[id,id_Solicitudesd]
    console.log(id_Solicitudesd);
    mysqlConecction.query("SELECT * FROM mostrarVisitas WHERE id_Solicitud=?",id_Solicitudesd,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;