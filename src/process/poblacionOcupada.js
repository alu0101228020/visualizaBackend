const axios = require('axios');
var cron = require('node-cron');
const insertData = require('../services/poblacionOcupadaService');
let CRON_TIME_2 = require('../utils/constants2');

cron.schedule(CRON_TIME_2, () => {
    axios.get('http://localhost:3200/api/empleo/poblacionActiva', {}).then (response => {
        axios.get('http://localhost:3200/api/empleo/poblacionParada', {}).then (response2 => {
            if (response2.data.length == 0 || response.data.length == 0) {
                return;
            }

            axios.get('http://localhost:3200/api/empleo/poblacionOcupada', {}).then (response3 => {
                let index1 = response.data.length - 1;
                let index2 = response2.data.length - 1;
                let size = response3.data.length - 1;
                let dateModified1 = response.data[index1].dateModified;
                let dateModified2 = response2.data[index2].dateModified;
                if (response3.data.length == 0)  {
                    let datasetProcessed = processDataset(response.data[index1], response2.data[index2]);
                    insertData(datasetProcessed);
                    return;
                }
                if (dateModified1 == dateModified2) {
                    if (response3.data[size].dateModified != dateModified1) {
                        let datasetProcessed = processDataset(response.data[index1], response2.data[index2]);
                        insertData(datasetProcessed);
                        return;
                    }
                }
            }).catch(error => console.log(error))
        }).catch(error => console.log(error)) 
    }).catch(error => console.log(error))
});

function processDataset (dataset1, dataset2) {
    let newAnnualWomen = [[], []];
    let newAnnualMen = [[], []];
    let newAnnualTotal = [[], []];

    let newQuarterlyWomen = [[], []];
    let newQuarterlyMen = [[], []];
    let newQuarterlyTotal = [[], []];

    let dateModified = '';

    dateModified = dataset1.dateModified;

    for (let i = 0; i < dataset1.annualTotal[0].length; i++) {
        let valor = dataset1.annualTotal[0][i] - dataset2.annualTotal[0][i];
        newAnnualTotal[0].push(Number(valor.toFixed(2)));
        newAnnualTotal[1].push(dataset1.annualTotal[1][i]);
    }

    for (let i = 0; i < dataset1.annualMen[0].length; i++) {
        let valor = dataset1.annualMen[0][i] - dataset2.annualMen[0][i];
        newAnnualMen[0].push(Number(valor.toFixed(2)));
        newAnnualMen[1].push(dataset1.annualMen[1][i]);
    }

    for (let i = 0; i < dataset1.annualWomen[0].length; i++) {
        let valor = dataset1.annualWomen[0][i] - dataset2.annualWomen[0][i];
        newAnnualWomen[0].push(Number(valor.toFixed(2)));
        newAnnualWomen[1].push(dataset1.annualWomen[1][i]);
    }

    for (let i = 0; i < dataset1.quarterlyTotal[0].length; i++) {
        let valor = dataset1.quarterlyTotal[0][i] - dataset2.quarterlyTotal[0][i];
        newQuarterlyTotal[0].push(Number(valor.toFixed(2)));
        newQuarterlyTotal[1].push(dataset1.quarterlyTotal[1][i]);
    }

    for (let i = 0; i < dataset1.quarterlyMen[0].length; i++) {
        let valor = dataset1.quarterlyMen[0][i] - dataset2.quarterlyMen[0][i];
        newQuarterlyMen[0].push(Number(valor.toFixed(2)));
        newQuarterlyMen[1].push(dataset1.quarterlyMen[1][i]);
    }

    for (let i = 0; i < dataset1.quarterlyWomen[0].length; i++) {
        let valor = dataset1.quarterlyWomen[0][i] - dataset2.quarterlyWomen[0][i];
        newQuarterlyWomen[0].push(Number(valor.toFixed(2)));
        newQuarterlyWomen[1].push(dataset1.quarterlyWomen[1][i]);
    }

    const json = JSON.stringify({
        annualTotal: newAnnualTotal,
        annualMen: newAnnualMen,
        annualWomen: newAnnualWomen,
        quarterlyTotal: newQuarterlyTotal,
        quarterlyMen: newQuarterlyMen,
        quarterlyWomen: newQuarterlyWomen,
        dateModified: dateModified
    });

    return json;
}