const mysql =require('mysql');

const mysqlConecction=mysql.createConnection({
    host:'database-reserva.cgry4nstxexo.us-east-1.rds.amazonaws.com',
    user:'admin',
    password: 'Qwebnmrty07',
    database:'Reserva'
});

mysqlConecction.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("DB is conected");
    }
});








module.exports=mysqlConecction;

