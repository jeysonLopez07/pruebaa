const express = require("express");
const app=express();
const cors = require('cors');

app.use(cors())
//setting
app.set('port',process.env.PORT || 3006)

//middlewares
app.use(express.json());

//Route
app.use(require('./routes/salas'));
app.use(require('./routes/agregar'));
app.use(require('./routes/agregar2'));
app.use(require('./routes/agregarVisitas'));
app.use(require('./routes/consultarVisitas'));
app.use(require('./routes/solicitudes'));
app.use(require('./routes/correo'));
app.use(require('./routes/consultarReservas'));
app.use(require('./routes/consultarReservas2'));
app.use(require('./routes/consultarReservas3'));
app.use(require('./routes/verComentario'));
app.use(require('./routes/verMotivo'));
app.use(require('./routes/rechazar'));
app.use(require('./routes/cancelar'));
app.use(require('./routes/mostrar'));
app.use(require('./routes/edificios'));
app.use(require('./routes/sala'));
app.use(require('./routes/consultarData'));
app.use(require('./routes/confirmar'));
app.use(require('./routes/instituciones'));
app.use(require('./routes/edificios2'));
app.use(require('./routes/area'));
app.use(require('./routes/usuario'));
app.use(require('./routes/cUsuario'));
app.use(require('./routes/consultarSala'));
app.use(require('./routes/agregarInfoUsuario'));
app.use(require('./routes/visitasDC'));
app.use(require('./routes/disponibilidad'));


//Starting the server

app.listen(app.get('port'),()=>{console.log("Server on port", app.get('port'));
});


