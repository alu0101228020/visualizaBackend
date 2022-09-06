const { Router } = require('express');
const  { getRecaidasDeAccidentes } = require('../controllers/recaidasDeAccidentesController.js');

const router = Router();

router.get('/recaidasDeAccidentes', getRecaidasDeAccidentes);

module.exports = router;