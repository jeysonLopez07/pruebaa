const express = require("express")
const router=express.Router();
const bcrypt = require('bcrypt');
const mysqlConecction=require('../database');
require('dotenv').config({path:"src/.env"})
const frontend=process.env.FRONTEND;


router.put("/editarContra",(req,res)=>{
    const {correo,contrasenaA,contrasenaN}=req.body
    console.log(correo)
    let respuesta=[]
    mysqlConecction.query("select * from usuario where correo_Electronico=?",correo,(err,rows,fields)=>{
        if(!err){
            let hash=rows[0].Contraseña;
            let id=rows[0].id_Usuario
            console.log(hash)
            bcrypt.compare(contrasenaA, hash, function(err, result) {
                // result == true

                if(result==true){
                    console.log("Son las mismas")
                    
                    bcrypt.genSalt(8, function (err, salt) {
                        bcrypt.hash(contrasenaN, salt, function (err, hash) {
                            const values=[hash,id]

                            mysqlConecction.query("update usuario set Contraseña=? where id_Usuario=?",values,(err,rows,fields)=>{
                                if(!err){
                                    respuesta=["Si"]
                                    res.json(respuesta);
                                    console.log("Entra aqui 2")
                                    
                                }else{
                                    respuesta=["No"]
                                    res.json(respuesta);
                                    console.log(err);
                                }
                            }); 

                        })});
                    
                
                        
                }else{
                    respuesta=["No"]
                    console.log("No son las mismas")
                    rows.splice(0, rows.length);
                    res.json(respuesta);
                }

            });

        }else{
            console.log(err);
        }
    });
    
});
module.exports=router;