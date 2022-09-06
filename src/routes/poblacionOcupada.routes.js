const { Router } = require('express');
const  { getPoblacionOcupada } = require('../controllers/poblacionOcupadaController');

const router = Router();

router.get('/poblacionOcupada', getPoblacionOcupada);

module.exports = router;