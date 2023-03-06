const { Schema, model } = require("mongoose");


const usuarioSchema = Schema({
    name : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    }
})

//exportamos la base de datos
module.exports  = model('Usuario', usuarioSchema);