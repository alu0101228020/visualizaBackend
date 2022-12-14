const noRecaidasDeAccidentes = require('../../models/noRecaidasDeAccidentes');

function insertData (datasetProcessed) {
    const {annualTotalTotal, annualMenTotal, annualWomenTotal, annualTotalMild,
        annualMenMild, annualWomenMild, annualTotalSerious,
        annualMenSerious, annualWomenSerious, dateModified} = JSON.parse(datasetProcessed);
    const dataset1 = new noRecaidasDeAccidentes({annualTotalTotal, annualMenTotal, annualWomenTotal, annualTotalMild,
        annualMenMild, annualWomenMild, annualTotalSerious,
        annualMenSerious, annualWomenSerious, dateModified});
    return dataset1.save();
}

module.exports = insertData;