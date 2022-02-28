const express = require("express");
const app=express();
const cors = require('cors');
const req = require("express/lib/request");

app.use(cors())
//setting
app.set('port',process.env.PORT || 3006)


//middlewares
app.use(express.json());

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
app.use(require('./routes/usuarios'));
app.use(require('./routes/editar'));
app.use(require('./routes/editarContra'));
app.use(require('./routes/consultarCodigo'));
app.use(require('./routes/confirmacion'));
app.use(require('./routes/roles'));
app.use(require('./routes/actualizarRol'));
app.use(require('./routes/mantenimiento'));
app.use(require('./routes/agregarMantenimiento'));
app.use(require('./routes/eliminarMantenimiento'));
app.use(require('./routes/reservasAceptadas'));
app.use(require('./routes/cancelarReserva'));


//Starting the server

app.listen(app.get('port'),()=>{console.log("Server on port", app.get('port'));
});


