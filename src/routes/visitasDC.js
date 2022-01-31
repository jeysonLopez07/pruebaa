const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/visitasDC",(req,res)=>{
    const {codigo_S}=req.body
    console.log(codigo_S);

    mysqlConecction.query("select * from visitas_data where id_Solicitud=?",codigo_S,(err,rows,fields)=>{
        if(!err){
            let contador=[]
            if(rows.length===0){
                contador=["vacio"]
                res.json(contador);
            }else{
                contador=["lleno"] 
                res.json(contador);    
            }
            
            
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;
