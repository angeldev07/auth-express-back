const { request, response } = require('express')
const {validationResult} = require('express-validator')

const newUser = (req = request, res = response) => {
    // obtener el body de la peticion
    console.log(req.body)

    return res.status(200).json({
        ok: true,
        msg: 'El usuario será procesado...'
    });
}


const login = (req = request , res = response) => {

    // body de la request
    console.log(req.body);

    return res.json({
        ok: true,
        msg: 'Ruta para logear al usuario'
    });
}

const tokenValidator = (req = request, res = response) => {
    return res.json({
        ok: true,
        msg: 'token validator'
    });
}

// Exportamos los controladores 
module.exports = {
    newUser,
    login,
    tokenValidator
}
