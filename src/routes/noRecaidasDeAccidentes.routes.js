const { Router } = require('express');
const  { getNoRecaidasDeAccidentes } = require('../controllers/noRecaidasDeAccidentesController.js');

const router = Router();

router.get('/noRecaidasDeAccidentes', getNoRecaidasDeAccidentes);

module.exports = router;