const express = require("express");
const { send, jsonp } = require("express/lib/response");
const res = require("express/lib/response");
const router=express.Router();
const nodemailer = require("nodemailer");

const mysqlConecction=require('../database');


router.post("/agregar2",(req)=>{
    console.log("Si entra en agregar2")
    const {Edificio,nombre_S,dia,inicio,fin,usuario,mensaje,motivo,estado}=req.body
    const values= [Edificio,nombre_S]
   
    mysqlConecction.query("select id_Sala from salas where edificio=? and nombre_Sala=? ",values,(err,rows,fields)=>{
        if(!err){
            var id=rows[0]
            var id_Sala=id.id_Sala;
            console.log("Este es id de la sala="+id_Sala)
            
            console.log(usuario);

            mysqlConecction.query("select id_Usuario from usuario where correo_Electronico=?",usuario,(err,rows,fields)=>{
                console.log("Euuu llega")
                var id_usuario=rows[0]
                var id_usuario2=id_usuario.id_Usuario;
                const values2=[dia,inicio,fin,estado,id_Sala,id_usuario2]
                mysqlConecction.query("INSERT INTO solicitud_Reserva(dia,hora_inicio,hora_Fin,confirmacion,id_Sala,id_usuario) values(?,?,?,?,?,?)",values2,(err,rows,fields)=>{
                    if(!err){
                        console.log("Aqui ingresa el dato")
                        mysqlConecction.query("select id_Solicitud from solicitud_Reserva order by id_Solicitud desc limit 1",(err,rows,fields)=>{
                            if(!err){
                                var ultima=rows[0]
                                const values3=[ultima.id_Solicitud,motivo]
                                const values4=[ultima.id_Solicitud,mensaje]
                                if(Edificio=="Data Center"){
                                    mysqlConecction.query("insert into comentarioD(id_Solicitud,comentario) values(?,?)",values3,(err,rows,fields)=>{})
                                        
                                }
                                mysqlConecction.query("insert into comentario_Solicitud(id_Solicitud,comentario) values(?,?)",values4,(err,rows,fields)=>{})


                                let transporte = nodemailer.createTransport({
                                    host: "smtp.gmail.com",
                                    port: 587,
                                    secure: false, // true for 465, false for other ports
                                    auth: {
                                      user: "jeysonherreralopez@gmail.com", // generated ethereal user
                                      pass: "ewjeezqokibawnff", // generated ethereal password
                                      
                                    },
                                    
                                  });
                                  console.log("llega hasta aqui")

                                  var mailOption={
                                    from: '"Reserva de Salas 👻" <jeysonherreralopez@gmail.com>', // sender address
                                    to:usuario, // list of receivers
                                    subject: "Confirmación de Reserva de Salas ✔", // Subject line
                                    html:"<h4>Se Creó una Reserva de Sala</h4>"+
                                          "<table border="+"1"+"><tr class="+"background-color:lightblue"+"><th>Edificio</th><th>Nombre de Sala</th><th>Día de reserva</th><th>Hora de Inicio</th><th>Hora de Finalización</th></tr>"+
                                          "<tr><td>"+Edificio+"</td><td>"+nombre_S+"</td><td>"+dia+"</td><td>"+inicio+"</td><td>"+fin+"</td></tr></table>" 
                                  /*"<h4>Se creó una solicitud de reserva<h4>"+
                                    "<p>En el Edificio: "+edificio+"<p>"+
                                    "<p>En la sala con Nombre: "+nombre+"<p>"+
                                     "<p> el Dia: " +dia+"<p>"+
                                     "<p>Hora de inicio: "+inicio+"<p>"+
                                     "<p>Hora de Finalizacion: "+fin+"<p>" // html body*/
                                  }
                                
                                 transporte.sendMail(mailOption,(error,info)=>{
                                     if(error){
                                         res.status(500).send(error.message);
                                     }else{
                                         console.log("Email enviado.");
                                         res.status(200).jsonp(req.body);
                                     }
                                 })
                            }
                            else{
                                console.log(err);
                            }
                        })

                    }else{
                        console.log(err);
                    }


                })


            })
              
            
        }else{
            console.log(err);
        }
        
   
    }); 
  
    

});
module.exports=router;