const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/instituciones",(req,res)=>{
    const {nombre}=req.body
    mysqlConecction.query("select nombre_Institucion from instituciones_Edificios where nombre_Edificio=?;",nombre,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
