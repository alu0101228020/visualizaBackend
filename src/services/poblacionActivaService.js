const poblacionActiva = require('../../models/poblacionActiva');

function insertData (datasetProcessed) {
    const {annualTotal, annualMen, annualWomen, quarterlyTotal, quarterlyMen, quarterlyWomen, dateModified} = JSON.parse(datasetProcessed);
    const dataset1 = new poblacionActiva({annualTotal, annualMen, annualWomen, quarterlyTotal, quarterlyMen, quarterlyWomen, dateModified});
    return dataset1.save();
}

module.exports = insertData;