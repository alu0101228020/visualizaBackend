const accidentesDeTrabajo = require('../../models/accidentesDeTrabajo');

function insertData (datasetProcessed) {
    const {annualTotalTotal, annualMenTotal, annualWomenTotal, annualTotalMild,
        annualMenMild, annualWomenMild, annualTotalSerious,
        annualMenSerious, annualWomenSerious,
        annualTotalMortal, annualMenMortal, annualWomenMortal, dateModified} = JSON.parse(datasetProcessed);
    const dataset1 = new accidentesDeTrabajo({annualTotalTotal, annualMenTotal, annualWomenTotal, annualTotalMild,
        annualMenMild, annualWomenMild, annualTotalSerious,
        annualMenSerious, annualWomenSerious,
        annualTotalMortal, annualMenMortal, annualWomenMortal, dateModified});
    return dataset1.save();
}

module.exports = insertData;