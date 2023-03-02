const {Router} = require('express');
// Importamos los controlador
const {newUser, login, tokenValidator } = require('../controllers/auth.controller')
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validarCampos');
// Con el Router, creamos un enrutador 
const router = Router()

// Desde aquí empezamos a construir las rutas para las peticiones 
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').isLength({min:6}),
    validarCampos
],newUser)


// endpoint para logear al usuari
router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6})
] ,login)

// Endpoint para validar y revalidar un token
router.get('/renew', tokenValidator)



// Necesitamos expotar las rutas
module.exports = router