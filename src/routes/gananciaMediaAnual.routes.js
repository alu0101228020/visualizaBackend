const { Router } = require('express');
const  { getGananciaMediaAnual } = require('../controllers/gananciaMediaAnualController');

const router = Router();

router.get('/gananciaMediaAnual', getGananciaMediaAnual);

module.exports = router;