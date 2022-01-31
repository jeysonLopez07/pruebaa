const express = require("express")
const router=express.Router();


const mysqlConecction=require('../database');


router.post("/agregar",(req)=>{
    const {dia,inicio,fin,estado,codigo,correo_Electronico,motivoV}=req.body
   console.log("Entra a esta prueba y el correo es:"+correo_Electronico)
    mysqlConecction.query("select id_Usuario from usuario where correo_Electronico=?",correo_Electronico,(err,rows,fields)=>{

        if(!err){
            var id_usuario=rows[0];
            var id_usuario2=id_usuario.id_Usuario
            console.log(id_usuario2)
            const values= [dia,inicio,fin,estado,codigo,id_usuario2]
            mysqlConecction.query("INSERT INTO solicitud_Reserva(dia,hora_inicio,hora_Fin,confirmacion,id_Sala,id_Usuario) values(?,?,?,?,?,?)",values,(err,rows,fields)=>{
                if(!err){
                    if(codigo==20 || codigo==21 || codigo==22 ||codigo==23){
                        mysqlConecction.query("select id_Solicitud from solicitud_Reserva order by id_Solicitud desc limit 1",values,(err,rows,fields)=>{
                            if(!err){
                               var ultima=rows[0]
                               console.log(ultima.id_Solicitud);
                               const values2=[ultima.id_Solicitud,motivoV]
                               mysqlConecction.query("insert into comentarioD(id_Solicitud,comentario) values(?,?)",values2,(err,rows,fields)=>{})
                              
                            }   
        
                        })
               
                    }     
                }else{
                    console.log(err);
                }
                
           
            }); 
        }


    })
    



    
  
    

});
module.exports=router;