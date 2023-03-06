const jwt = require('jsonwebtoken');

const generarJWT = ( {uid, nombre} ) => {
    
    //información que se encripta para autenticar
    const payload = {uid,nombre};

    /* Creamos una promera para volverlo async */
    return new Promise( (resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        }, (err, token) => {
            if(err) 
                reject(err)
            else 
                resolve(token)
        })   
    } )
 
}

module.exports = {
    generarJWT
}