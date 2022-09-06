const distintasTasas = require('../../models/gananciaMediaAnual');

function insertData (datasetProcessed) {
    const {annualTotalTotal, annualMenTotal, annualWomenTotal, 
        annualTotalInd, annualMenInd, annualWomenInd,
        annualTotalConst,annualMenConst, annualWomenConst,
        annualTotalServ, annualMenServ, annualWomenServ, dateModified} = JSON.parse(datasetProcessed);
    const dataset1 = new distintasTasas({annualTotalTotal, annualMenTotal, annualWomenTotal, 
        annualTotalInd, annualMenInd, annualWomenInd, 
        annualTotalConst, annualMenConst, annualWomenConst,
        annualTotalServ, annualMenServ, annualWomenServ, dateModified});
    return dataset1.save();
}

module.exports = insertData;