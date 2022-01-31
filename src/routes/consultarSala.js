const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.put("/consultarSala",(req,res)=>{
const {rol,edificio,nombre,dia,inicio,fin}=req.body;
const values= [edificio,nombre, dia.substring(0,10),inicio,fin]
console.log(rol);
if(rol!=="Usuario"){
    mysqlConecction.query("CALL verificaciónFecha(?,?,?,?,?)",values,(err,rows,fields)=>{
        if(!err){
            res.json(rows);
            console.log(rows)
            
        }else{
            console.log(err);
        }
    });
}
})

module.exports=router;