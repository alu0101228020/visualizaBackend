const { Router } = require('express');
const  { getPoblacionParada } = require('../controllers/poblacionParadaController');

const router = Router();

router.get('/poblacionParada', getPoblacionParada);

module.exports = router;