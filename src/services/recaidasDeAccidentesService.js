const recaidasDeAccidentes = require('../../models/recaidasDeAccidentes');

function insertData (datasetProcessed) {
    const {annualTotalTotal, annualMenTotal, annualWomenTotal, annualTotalMild,
        annualMenMild, annualWomenMild, annualTotalSerious,
        annualMenSerious, annualWomenSerious, dateModified} = JSON.parse(datasetProcessed);
    const dataset1 = new recaidasDeAccidentes({annualTotalTotal, annualMenTotal, annualWomenTotal, annualTotalMild,
        annualMenMild, annualWomenMild, annualTotalSerious,
        annualMenSerious, annualWomenSerious, dateModified});
    return dataset1.save();
}

module.exports = insertData;