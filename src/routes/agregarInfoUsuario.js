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


router.put("/agregarInfoUsuario",cors(corsOptions), (req, res) => {
  const {
    nombre,
    apellido,
    nombreUsuario,
    correo,
    contrasena,
    cContrasena,
    telefono,
    edificio,
    institucion,
    nombreArea,
  } = req.body;

  console.log("Si llega info");
  mysqlConecction.query(
    "select correo_Electronico from usuario where correo_Electronico=?",
    correo,
    (err, rows, fields) => {
      if (!err) {
        if (rows.length !== 0) {
          const arreglo=["Rechazado"]
          res.json(arreglo);
          console.log("hOLA ENTRA AQUI");
        } else {
          bcrypt.genSalt(8, function (err, salt) {
            bcrypt.hash(contrasena, salt, function (err, hash) {
              const values = [correo, hash];
              mysqlConecction.query(
                "insert into usuario(correo_Electronico,contraseña) values(?,?)",
                values,
                (err) => {
                  if (!err) {
                    mysqlConecction.query(
                      "select id_Area from areas_trabajo where nombre_Are=?",
                      nombreArea,
                      (err, rows) => {
                        if (!err) {
                          const id_Area = rows[0].id_Area;
                          mysqlConecction.query(
                            "select id_Instituciones from instituciones where nombre_Institucion=?",
                            institucion,
                            (err, rows) => {
                              if (!err) {
                                const id_Institucion = rows[0].id_Instituciones;
                                mysqlConecction.query(
                                  "select id_Edificio from edificios where nombre_Edificio=?",
                                  edificio,
                                  (err, rows) => {
                                    if (!err) {
                                      const id_Edificio = rows[0].id_Edificio;

                                      mysqlConecction.query(
                                        "select id_Usuario from usuario where correo_Electronico=?",
                                        correo,
                                        (err, rows) => {
                                          if (!err) {
                                            const id_Usuario =
                                              rows[0].id_Usuario;
                                            const values10=[nombre,apellido,nombreUsuario,telefono,id_Edificio,id_Institucion,id_Area,id_Usuario]
                                              mysqlConecction.query(
                                                "insert into informacionusuario(nombre,apellido,nombre_Usuario,telefono,id_Edificio,id_Instituciones,id_Area,id_Usuario) values(?,?,?,?,?,?,?,?)",
                                                values10,
                                                (err, rows) => {
                                                  if (!err) {
                                                    const uno=1
                                                    values2=[id_Usuario,uno]
                                                    mysqlConecction.query(
                                                      "insert into usuarios_roles(id_Usuario,id_rol) values(?,?)",
                                                      values2,
                                                      (err, rows) => {
                                                        const arreglo=["Confirmado"]

                                                        res.json(arreglo);
                                                      })
                                                  } else {
                                                    console.log(err);
                                                  }
                                                }
                                              );


                                          } else {
                                            console.log(err);
                                          }
                                        }
                                      );
                                    } else {
                                      console.log(err);
                                    }
                                  }
                                );
                              } else {
                                console.log(err);
                              }
                            }
                          );
                        } else {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    console.log(err);
                  }
                }
              );
            });
          });
        }
      } else {
        console.log(err);
      }
    }
  );
});

module.exports=router;