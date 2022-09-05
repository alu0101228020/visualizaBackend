const distintasTasas = require('../../models/distintasTasas');

function insertData (datasetProcessed) {
    const {annualTotalExercise, annualMenExercise, annualWomenExercise, annualTotalUnemployment,
        annualMenUnemployment, annualWomenUnemployment, annualTotalEmployment,
        annualMenEmployment, annualWomenEmployment,
        quarterlyTotalExercise, quarterlyMenExercise, quarterlyWomenExercise,
        quarterlyTotalUnemployment, quarterlyMenUnemployment, quarterlyWomenUnemployment,
        quarterlyTotalEmployment, quarterlyMenEmployment, quarterlyWomenEmployment, dateModified} = JSON.parse(datasetProcessed);
    const dataset1 = new distintasTasas({annualTotalExercise, annualMenExercise, annualWomenExercise, annualTotalUnemployment,
        annualMenUnemployment, annualWomenUnemployment, annualTotalEmployment,
        annualMenEmployment, annualWomenEmployment,
        quarterlyTotalExercise, quarterlyMenExercise, quarterlyWomenExercise,
        quarterlyTotalUnemployment, quarterlyMenUnemployment, quarterlyWomenUnemployment,
        quarterlyTotalEmployment, quarterlyMenEmployment, quarterlyWomenEmployment, dateModified});
    return dataset1.save();
}

module.exports = insertData;