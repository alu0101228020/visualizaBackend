const poblacionParada = require('../../models/poblacionParada');

function insertData (datasetProcessed) {
    const {annualTotal, annualMen, annualWomen, quarterlyTotal, quarterlyMen, quarterlyWomen} = JSON.parse(datasetProcessed);
    const dataset1 = new poblacionParada({annualTotal, annualMen, annualWomen, quarterlyTotal, quarterlyMen, quarterlyWomen});
    return dataset1.save();
}

module.exports = insertData;