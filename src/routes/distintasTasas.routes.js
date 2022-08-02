const { Router } = require('express');
const  { getDistintasTasas } = require('../controllers/distintasTasasController.js');

const router = Router();

router.get('/distintasTasas', getDistintasTasas);

module.exports = router;