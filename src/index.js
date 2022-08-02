const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('./process/poblacionActiva.js');
require('./process/distintasTasas.js');
require('./process/gananciaMediaAnual.js');
require('./process/poblacionParada.js');
require('./process/poblacionOcupada.js');
require('./process/accidentesDeTrabajo.js');
require('./process/recaidasDeAccidentes.js');
require('./process/noRecaidasDeAccidentes.js');

const {mongoose} = require('./database');

const datasetRoutes1 = require('./routes/poblacionActiva.routes');
const datasetRoutes2 = require('./routes/distintasTasas.routes');
const datasetRoutes3 = require('./routes/gananciaMediaAnual.routes');
const datasetRoutes4 = require('./routes/poblacionParada.routes');
const datasetRoutes5 = require('./routes/poblacionOcupada.routes');
const datasetRoutes6 = require('./routes/accidentesDeTrabajo.routes');
const datasetRoutes7 = require('./routes/recaidasDeAccidentes.routes');
const datasetRoutes8 = require('./routes/noRecaidasDeAccidentes.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/empleo', datasetRoutes1);
app.use('/api/empleo', datasetRoutes2);
app.use('/api/empleo', datasetRoutes3);
app.use('/api/empleo', datasetRoutes4);
app.use('/api/empleo', datasetRoutes5);
app.use('/api/empleo', datasetRoutes6);
app.use('/api/empleo', datasetRoutes7);
app.use('/api/empleo', datasetRoutes8);

app.listen(3200);
console.log('Server on port 3200');
