const axios = require('axios');
var cron = require('node-cron');
const insertData = require('../services/distintasTasasService');
let CRON_TIME = require('../utils/constants');

cron.schedule(CRON_TIME, () => {
    axios.get('https://datos.canarias.es/catalogos/general/api/action/package_show?id=450f65bf-8e93-461a-93f7-8de1c64ce485', {}).then (response => {
        let url = '';
        for (let i = 0; i < response.data.result.resources.length; i++) {
            if (response.data.result.resources[i].format === 'JSON') {
                url = response.data.result.resources[i].access_url;
            }
        }
        axios.get(url, {}).then (response2 => {
            let dateModified = '';
            response2.data.categories.forEach(category => {
                if (category.variable === 'Periodos') {
                    dateModified = String(category.codes[0]);
                }
            });
            axios.get('http://localhost:3200/api/empleo/distintasTasas', {}).then (response3 => {
                let size = response3.data.length - 1;
                if (response3.data.length == 0) {
                    let datasetProcessed = processDataset(response2);
                    insertData(datasetProcessed);
                    return;
                }
                if (response3.data[size].dateModified != dateModified) {
                    let datasetProcessed = processDataset(response2);
                    insertData(datasetProcessed);
                    return;
                }
            }).catch(error => console.log(error))

        }).catch(error => console.log(error))

    }).catch(error => console.log(error))
});

function processDataset (dataset) {
    let annualTotalExercise = [[], []];
    let annualMenExercise = [[], []];
    let annualWomenExercise = [[], []];

    let annualTotalUnemployment = [[], []];
    let annualMenUnemployment = [[], []];
    let annualWomenUnemployment = [[], []];

    let annualTotalEmployment = [[], []];
    let annualMenEmployment = [[], []];
    let annualWomenEmployment = [[], []];

    let quarterlyTotalExercise = [[], []];
    let quarterlyMenExercise = [[], []];
    let quarterlyWomenExercise = [[], []];

    let quarterlyTotalUnemployment = [[], []];
    let quarterlyMenUnemployment = [[], []];
    let quarterlyWomenUnemployment = [[], []];

    let quarterlyTotalEmployment = [[], []];
    let quarterlyMenEmployment = [[], []];
    let quarterlyWomenEmployment = [[], []];

    let iteration = 0;
    let annualValorTotalExercise = 0;
    let annualValorTotalUnemployment = 0;
    let annualValorTotalEmployment = 0;

    let annualValorMenExercise = 0;
    let annualValorMenUnemployment = 0;
    let annualValorMenEmployment = 0;

    let annualValorWomenExercise = 0;
    let annualValorWomenUnemployment = 0;
    let annualValorWomenEmployment = 0;

    let dateModified = '';

    dataset.data.categories.forEach(category => {
        if (category.variable === 'Periodos') {
            dateModified = category.codes[0];
        }
    });

    for (const dataObj of dataset.data.data.reverse()) {
        iteration++;
        if (dataObj.dimCodes[0] === "T" && dataObj.dimCodes[1] === "T") {
            if (dataObj.dimCodes[3] === "1") {
                annualValorTotalExercise += parseFloat(dataObj.Valor)
                quarterlyTotalExercise[0].push(parseFloat(dataObj.Valor))
                quarterlyTotalExercise[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorTotalExercise = annualValorTotalExercise/4;
                    annualTotalExercise[0].push(Math.round(annualValorTotalExercise))
                    annualTotalExercise[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorTotalExercise = 0;
                }
            }
            if (dataObj.dimCodes[3] === "2") {
                annualValorTotalUnemployment += parseFloat(dataObj.Valor)
                quarterlyTotalUnemployment[0].push(parseFloat(dataObj.Valor))
                quarterlyTotalUnemployment[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorTotalUnemployment = annualValorTotalUnemployment/4;
                    annualTotalUnemployment[0].push(Math.round(annualValorTotalUnemployment))
                    annualTotalUnemployment[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorTotalUnemployment = 0;
                }
            }
            if (dataObj.dimCodes[3] === "3") {
                annualValorTotalEmployment += parseFloat(dataObj.Valor)
                quarterlyTotalEmployment[0].push(parseFloat(dataObj.Valor))
                quarterlyTotalEmployment[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorTotalEmployment = annualValorTotalEmployment/4;
                    annualTotalEmployment[0].push(Math.round(annualValorTotalEmployment))
                    annualTotalEmployment[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorTotalEmployment = 0;
                }
            }
        }

        if (dataObj.dimCodes[0] === "M" && dataObj.dimCodes[1] === "T") {
            if (dataObj.dimCodes[3] === "1") {
                annualValorMenExercise += parseFloat(dataObj.Valor)
                quarterlyMenExercise[0].push(parseFloat(dataObj.Valor))
                quarterlyMenExercise[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorMenExercise = annualValorMenExercise/4;
                    annualMenExercise[0].push(Math.round(annualValorMenExercise))
                    annualMenExercise[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorMenExercise = 0;
                }
            }
            if (dataObj.dimCodes[3] === "2") {
                annualValorMenUnemployment += parseFloat(dataObj.Valor)
                quarterlyMenUnemployment[0].push(parseFloat(dataObj.Valor))
                quarterlyMenUnemployment[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorMenUnemployment = annualValorMenUnemployment/4;
                    annualMenUnemployment[0].push(Math.round(annualValorMenUnemployment))
                    annualMenUnemployment[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorMenUnemployment = 0;
                }
            }
            if (dataObj.dimCodes[3] === "3") {
                annualValorMenEmployment += parseFloat(dataObj.Valor)
                quarterlyMenEmployment[0].push(parseFloat(dataObj.Valor))
                quarterlyMenEmployment[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorMenEmployment = annualValorMenEmployment/4;
                    annualMenEmployment[0].push(Math.round(annualValorMenEmployment))
                    annualMenEmployment[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorMenEmployment = 0;
                }
            }
        }

        if (dataObj.dimCodes[0] === "F" && dataObj.dimCodes[1] === "T") {
            if (dataObj.dimCodes[3] === "1") {
                annualValorWomenExercise += parseFloat(dataObj.Valor)
                quarterlyWomenExercise[0].push(parseFloat(dataObj.Valor))
                quarterlyWomenExercise[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorWomenExercise = annualValorWomenExercise/4;
                    annualWomenExercise[0].push(Math.round(annualValorWomenExercise))
                    annualWomenExercise[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorWomenExercise = 0;
                }
            }
            if (dataObj.dimCodes[3] === "2") {
                annualValorWomenUnemployment += parseFloat(dataObj.Valor)
                quarterlyWomenUnemployment[0].push(parseFloat(dataObj.Valor))
                quarterlyWomenUnemployment[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorWomenUnemployment = annualValorWomenUnemployment/4;
                    annualWomenUnemployment[0].push(Math.round(annualValorWomenUnemployment))
                    annualWomenUnemployment[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorWomenUnemployment = 0;
                }
            }
            if (dataObj.dimCodes[3] === "3") {
                annualValorWomenEmployment += parseFloat(dataObj.Valor)
                quarterlyWomenEmployment[0].push(parseFloat(dataObj.Valor))
                quarterlyWomenEmployment[1].push(dataObj.dimCodes[2])
                if (dataObj.dimCodes[2][5] === '4' || iteration === dataset.data.data.length) {
                    annualValorWomenEmployment = annualValorWomenEmployment/4;
                    annualWomenEmployment[0].push(Math.round(annualValorWomenEmployment))
                    annualWomenEmployment[1].push(dataObj.dimCodes[2].substr(0,4))
                    annualValorWomenEmployment = 0;
                }
            }
        }
    }


    const json = JSON.stringify({
        annualTotalExercise: annualTotalExercise, 
        annualMenExercise: annualMenExercise,
        annualWomenExercise: annualWomenExercise,
        annualTotalUnemployment: annualTotalUnemployment,
        annualMenUnemployment: annualMenUnemployment,
        annualWomenUnemployment: annualWomenUnemployment,
        annualTotalEmployment: annualTotalEmployment,
        annualMenEmployment: annualMenEmployment,
        annualWomenEmployment: annualWomenEmployment,

        quarterlyTotalExercise: quarterlyTotalExercise, 
        quarterlyMenExercise: quarterlyMenExercise,
        quarterlyWomenExercise: quarterlyWomenExercise,
        quarterlyTotalUnemployment: quarterlyTotalUnemployment,
        quarterlyMenUnemployment: quarterlyMenUnemployment,
        quarterlyWomenUnemployment: quarterlyWomenUnemployment,
        quarterlyTotalEmployment: quarterlyTotalEmployment,
        quarterlyMenEmployment: quarterlyMenEmployment,
        quarterlyWomenEmployment: quarterlyWomenEmployment,

        dateModified: dateModified
    });

    return json;
}