const express = require("express")
const router=express.Router();
const bcrypt = require('bcrypt');
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;
const cors = require('cors');
var whiteList=[`${frontend}`]

var corsOptions={
    origin: function(origin,callback){
        if(whiteList.indexOf(origin)!==-1){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}


router.put("/usuario",(req,res)=>{
    const {correo_Electronico,contraseña}=req.body
    const values=[correo_Electronico,contraseña]
    console.log("Corre: "+correo_Electronico +"contraseña:"+contraseña)

    mysqlConecction.query("select * from usuario where correo_Electronico=?",values,(err,rows,fields)=>{
        if(!err){

            if(rows.length===0){
                res.json(rows);
            }else if(rows.length!==0){

            let hash=rows[0].Contraseña;
            bcrypt.compare(contraseña, hash, function(err, result) {
                // result == true

                if(result==true){
                    console.log("Son las mismas")

                    mysqlConecction.query("select * from Prueba6 WHERE correo_Electronico=?",correo_Electronico,(err,rows,fields)=>{
                        if(!err){
                            res.json(rows);
                            console.log(rows)
                            console.log(correo_Electronico);
                            console.log("Entra aqui 2")
                            
                        }else{
                            console.log(err);
                        }
                    });     
                }else{
                    console.log("No son las mismas")
                    rows.splice(0, rows.length);
                    res.json(rows);
                }

            });

        }

        }
    })

   /* mysqlConecction.query("select * from usuario where correo_Electronico=? and Contraseña=?",values,(err,rows,fields)=>{
        if(!err){
           
            console.log("Entra aqui")
            console.log(rows);
            if(rows.length===0){
                res.json(rows);
            }else if(rows.length!==0){
            
                mysqlConecction.query(
                  "select * from Mostrar_Informacion_Usuario2 WHERE correo_Electronico=?",
                  correo_Electronico,
                  (err, rows, fields) => {
                    if (!err) {
                      res.json(rows);
                      console.log("Entra aqui 2");
                    } else {
                      console.log(err);
                    }
                  }
                );  
         
         
         
         
                mysqlConecction.query("select * from Mostrar_Informacion_Usuario2 WHERE correo_Electronico=?",correo_Electronico,(err,rows,fields)=>{
                if(!err){
                    res.json(rows);
                    console.log("Entra aqui 2")
                    
                }else{
                    console.log(err);
                }
            });          
        }
        }else{
            console.log(err);
        }
    });*/

    
});
module.exports=router;
