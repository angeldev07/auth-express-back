const { request, response } = require('express')
const {validationResult} = require('express-validator')
const Usuario = require('../models/User');
 

const newUser = async (req = request, res = response) => {
    
    const { name, email, password} = req.body

    try {
            
        //Verificar el email
        //con la funcion findOne de mongoose podemos buscar algo 
        const usuario = await Usuario().findOne({email});
        
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Ya hay un usuario con el mismo correo.'
            })
        }

        //Crear el usuario con el correo 
        const dbUsuario = new Usuario( req.body );

        //hashear la contraseña 


        //Generare el JWT


        //Crear el registro en la base de datos     
        await dbUsuario.save();
        //Generar respuesta exitosa 
        return res.status(200).json({
            ok: true,
            uid: dbUsuario.id,
            msg: `El usuario ${name} fue creado exitosamente`
        })
       
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
    
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
