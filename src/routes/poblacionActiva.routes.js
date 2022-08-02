const { Router } = require('express');
const  { getPoblacionActiva } = require('../controllers/poblacionActivaController');

const router = Router();

router.get('/poblacionActiva', getPoblacionActiva);

module.exports = router;