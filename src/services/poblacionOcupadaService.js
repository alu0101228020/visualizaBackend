const poblacionOcupada = require('../../models/poblacionOcupada');

function insertData (datasetProcessed) {
    const {annualTotal, annualMen, annualWomen, quarterlyTotal, quarterlyMen, quarterlyWomen} = JSON.parse(datasetProcessed);
    const dataset1 = new poblacionOcupada({annualTotal, annualMen, annualWomen, quarterlyTotal, quarterlyMen, quarterlyWomen});
    return dataset1.save();
}

module.exports = insertData;