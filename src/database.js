const mysql =require('mysql');

const mysqlConecction = mysql.createConnection({
  host: "181.115.47.109",
  user: "User_test1",
  password: "Prueba123",
  database: "reserva",
});

mysqlConecction.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("DB is conected");
    }
});








module.exports=mysqlConecction;

