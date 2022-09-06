const { Router } = require('express');
const  { getAccidentesDeTrabajo } = require('../controllers/accidentesDeTrabajoController.js');

const router = Router();

router.get('/accidentesDeTrabajo', getAccidentesDeTrabajo);

module.exports = router;