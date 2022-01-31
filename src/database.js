const mysql =require('mysql');

const mysqlConecction=mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'PasswordRoot07',
    database:'reserva'
});

mysqlConecction.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("DB is conected");
    }
});








module.exports=mysqlConecction;

