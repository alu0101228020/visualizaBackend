const distintasTasas = require('../../models/distintasTasas');

function insertData (datasetProcessed) {
    const {annualTotalExercise, annualMenExercise, annualWomenExercise, annualTotalUnemployment,
        annualMenUnemployment, annualWomenUnemployment, annualTotalEmployment,
        annualMenEmployment, annualWomenEmployment,
        quarterlyTotalExercise, quarterlyMenExercise, quarterlyWomenExercise,
        quarterlyTotalUnemployment, quarterlyMenUnemployment, quarterlyWomenUnemployment,
        quarterlyTotalEmployment, quarterlyMenEmployment, quarterlyWomenEmployment} = JSON.parse(datasetProcessed);
    const dataset1 = new distintasTasas({annualTotalExercise, annualMenExercise, annualWomenExercise, annualTotalUnemployment,
        annualMenUnemployment, annualWomenUnemployment, annualTotalEmployment,
        annualMenEmployment, annualWomenEmployment,
        quarterlyTotalExercise, quarterlyMenExercise, quarterlyWomenExercise,
        quarterlyTotalUnemployment, quarterlyMenUnemployment, quarterlyWomenUnemployment,
        quarterlyTotalEmployment, quarterlyMenEmployment, quarterlyWomenEmployment});
    return dataset1.save();
}

module.exports = insertData;