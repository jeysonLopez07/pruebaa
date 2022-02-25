const express = require("express")
const router=express.Router();
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

router.post("/agregarVisitas",cors(corsOptions),(req)=>{
    const {codigoS,nombre1,identidad1,nombre2,identidad2,nombre3,identidad3,nombre4,identidad4}=req.body
    const values1=[codigoS,nombre1,identidad1]
    const values2=[codigoS,nombre2,identidad2]
    const values3=[codigoS,nombre3,identidad3]
    const values4=[codigoS,nombre4,identidad4]


    if(nombre1!="" || identidad1!="" ){
        mysqlConecction.query("INSERT INTO visitas_Data(id_Solicitud,Nombre,id) values(?,?,?)",values1,(err,rows,fields)=>{
        }); 
        console.log(values1)
    }

    if(nombre2!="" || identidad2!="" ){
        mysqlConecction.query("INSERT INTO visitas_Data(id_Solicitud,Nombre,id) values(?,?,?)",values2,(err,rows,fields)=>{
        }); 
    }

    if(nombre3!="" || identidad3!="" ){
        mysqlConecction.query("INSERT INTO visitas_Data(id_Solicitud,Nombre,id) values(?,?,?)",values3,(err,rows,fields)=>{
        }); 
    }

    if(nombre4!="" || identidad4!="" ){
        mysqlConecction.query("INSERT INTO visitas_Data(id_Solicitud,Nombre,id) values(?,?,?)",values4,(err,rows,fields)=>{
        }); 
    }
    

});
module.exports=router;