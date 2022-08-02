const distintasTasas = require('../../models/gananciaMediaAnual');

function insertData (datasetProcessed) {
    const {annualTotalTotal, annualMenTotal, annualWomenTotal, 
        annualTotalInd, annualMenInd, annualWomenInd,
        annualTotalConst,annualMenConst, annualWomenConst,
        annualTotalServ, annualMenServ, annualWomenServ} = JSON.parse(datasetProcessed);
    const dataset1 = new distintasTasas({annualTotalTotal, annualMenTotal, annualWomenTotal, 
        annualTotalInd, annualMenInd, annualWomenInd, 
        annualTotalConst, annualMenConst, annualWomenConst,
        annualTotalServ, annualMenServ, annualWomenServ});
    return dataset1.save();
}

module.exports = insertData;