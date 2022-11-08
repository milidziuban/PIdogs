const { Router } = require('express');
const dogRouter = require('./dog')
const tempRouter = require('./temperament')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.use('/' , express.json())

router.use('/dog' , dogRouter)
router.use('/temperament' , tempRouter)


module.exports = router;
