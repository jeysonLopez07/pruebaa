const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');

router.put("/verMotivo",(req,res)=>{
    const {codigoSC}=req.body

    mysqlConecction.query("select comentario from comentarioD where id_Solicitud=?;",codigoSC,(err,rows,fields)=>{
        if(!err){
            res.json(rows)
        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;