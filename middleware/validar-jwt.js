const {request, response} = require('express');
const jwt = require('jsonwebtoken');

const validateHeaderJWT  = (req = request, res = response, next) => {
    /* Obtenemos el token del header  */
    const tokenHeader = req.header('x-token');

    if( ! tokenHeader) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token...'
        })
    }

    try {
        const {uid, name} = jwt.verify(tokenHeader, process.env.SECRET_JWT_SEED)
        console.log({uid, name});
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token...'
        }) 
    }

    next();

}

module.exports = {
    validateHeaderJWT
}