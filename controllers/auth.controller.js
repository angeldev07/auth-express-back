const { request, response } = require('express')
const {validationResult} = require('express-validator')
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
 

const newUser = async (req = request, res = response) => {
    
    const { name, email, password} = req.body
    console.log(req.body);

    try {
            
        //Verificar el email
        //con la funcion findOne de mongoose podemos buscar algo 
        const usuario = await Usuario.findOne({email});
        
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Ya hay un usuario con el mismo correo.'
            })
        }

        //Crear el usuario con el correo 
        const dbUsuario = new Usuario( req.body );
        console.log(dbUsuario);
        //hashear la contraseña 
        const salt = bcrypt.genSaltSync();
        dbUsuario.password = bcrypt.hashSync(password, salt);;
        //Generare el JWT
        const token = await generarJWT({uid: dbUsuario._id, nombre: dbUsuario.name})

        //Crear el registro en la base de datos     
        await dbUsuario.save();
        //Generar respuesta exitosa 
        return res.status(200).json({
            ok: true,
            uid: dbUsuario.id,
            email,
            msg: `El usuario ${name} fue creado exitosamente`,
            token
        })
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        });
    }
    
}


const login = async (req = request , res = response) => {

    try {
        
        const {email,password} = req.body;
        /* Encontramos el usuario de momento por el email */
        const usuario = await Usuario.findOne({email});
        /* Si no tenemos nada, retornamos un error */
        if(! usuario){
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el correo ${email}`
            })
        }

        /* si existe el usuario, hacemos el resto del proceso */

        const validPass = await bcrypt.compare(password, usuario.password);

        if( ! validPass){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña suministrada no coincide...'
            });
        }

        /* Generamos el JWT */
        
        const token =  await generarJWT({uid: usuario.id, nombre: usuario.name});
        
        return res.status(200).json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.name,
            email: usuario.email,
            token
        })
        

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: true,
            msg: 'Ha ocurrido un error inesperado'
        });
    }

}

const tokenValidator =  async (req = request, res = response) => {
    /* Obtenemos los datos de la request */
    const {uid} = req;
    // Consulta ala bd

    const userDB = await Usuario.findById(uid)
    
    /* Generamos un nuevo JWT */
    const token = await generarJWT({uid, nombre: userDB.name})

    return res.json({
        ok: true,
        uid,
        nombre: userDB.name,
        email: userDB.email,
        token,
        msg: 'token validato'
    });
}

// Exportamos los controladores 
module.exports = {
    newUser,
    login,
    tokenValidator
}
