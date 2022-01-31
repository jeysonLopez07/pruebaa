const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/sala",(req,res)=>{
    const {nombre}=req.body
    mysqlConecction.query("select distinct(nombre_Sala) from salas where edificio=?",nombre,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
