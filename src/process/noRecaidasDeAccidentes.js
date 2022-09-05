const axios = require('axios');
var cron = require('node-cron');
const insertData = require('../services/noRecaidasDeAccidentesService');
const CRON_TIME_2 = require('../utils/constants');

cron.schedule(CRON_TIME_2, () => {
    axios.get('http://localhost:3200/api/empleo/accidentesDeTrabajo', {}).then (response => {
        axios.get('http://localhost:3200/api/empleo/recaidasDeAccidentes', {}).then (response2 => {
            if (response2.data.length == 0 || response.data.length == 0) {
                return;
            }

            axios.get('http://localhost:3200/api/empleo/noRecaidasDeAccidentes', {}).then (response3 => {
                let index1 = response.data.length - 1;
                let index2 = response2.data.length - 1;
                let size = response3.data.length - 1;
                let dateModified = response2.data[index2].dateModified;
                if (response3.data.length == 0)  {
                    let datasetProcessed = processDataset(response.data[index1], response2.data[index2]);
                    insertData(datasetProcessed);
                    return;
                }
                if (response3.data[size].dateModified != dateModified) {
                    let datasetProcessed = processDataset(response.data[index1], response2.data[index2]);
                    insertData(datasetProcessed);
                    return;
                }
            }).catch(error => console.log(error))
        }).catch(error => console.log(error)) 
    }).catch(error => console.log(error))
});

function processDataset (dataset1, dataset2) {
    let newAnnualWomenTotal = [[], []];
    let newAnnualMenTotal = [[], []];
    let newAnnualTotalTotal = [[], []];

    let newAnnualWomenMild = [[], []];
    let newAnnualMenMild = [[], []];
    let newAnnualTotalMild = [[], []];

    let newAnnualWomenSerious = [[], []];
    let newAnnualMenSerious = [[], []];
    let newAnnualTotalSerious = [[], []];

    let dateModified = '';

    dateModified = dataset1.dateModified;

    for (let i = 0; i < dataset1.annualTotalTotal[0].length; i++) {
        let valor = dataset1.annualTotalTotal[0][i] - dataset2.annualTotalTotal[0][i];
        newAnnualTotalTotal[0].push(Number(valor.toFixed(2)));
        newAnnualTotalTotal[1].push(dataset1.annualTotalTotal[1][i]);
    }

    for (let i = 0; i < dataset1.annualMenTotal[0].length; i++) {
        let valor = dataset1.annualMenTotal[0][i] - dataset2.annualMenTotal[0][i];
        newAnnualMenTotal[0].push(Number(valor.toFixed(2)));
        newAnnualMenTotal[1].push(dataset1.annualMenTotal[1][i]);
    }

    for (let i = 0; i < dataset1.annualWomenTotal[0].length; i++) {
        let valor = dataset1.annualWomenTotal[0][i] - dataset2.annualWomenTotal[0][i];
        newAnnualWomenTotal[0].push(Number(valor.toFixed(2)));
        newAnnualWomenTotal[1].push(dataset1.annualWomenTotal[1][i]);
    }

    for (let i = 0; i < dataset1.annualTotalMild[0].length; i++) {
        let valor = dataset1.annualTotalMild[0][i] - dataset2.annualTotalMild[0][i];
        newAnnualTotalMild[0].push(Number(valor.toFixed(2)));
        newAnnualTotalMild[1].push(dataset1.annualTotalMild[1][i]);
    }

    for (let i = 0; i < dataset1.annualMenMild[0].length; i++) {
        let valor = dataset1.annualMenMild[0][i] - dataset2.annualMenMild[0][i];
        newAnnualMenMild[0].push(Number(valor.toFixed(2)));
        newAnnualMenMild[1].push(dataset1.annualMenMild[1][i]);
    }

    for (let i = 0; i < dataset1.annualWomenMild[0].length; i++) {
        let valor = dataset1.annualWomenMild[0][i] - dataset2.annualWomenMild[0][i];
        newAnnualWomenMild[0].push(Number(valor.toFixed(2)));
        newAnnualWomenMild[1].push(dataset1.annualWomenMild[1][i]);
    }

    for (let i = 0; i < dataset1.annualTotalSerious[0].length; i++) {
        let valor = dataset1.annualTotalSerious[0][i] - dataset2.annualTotalSerious[0][i];
        newAnnualTotalSerious[0].push(Number(valor.toFixed(2)));
        newAnnualTotalSerious[1].push(dataset1.annualTotalSerious[1][i]);
    }

    for (let i = 0; i < dataset1.annualMenSerious[0].length; i++) {
        let valor = dataset1.annualMenSerious[0][i] - dataset2.annualMenSerious[0][i];
        newAnnualMenSerious[0].push(Number(valor.toFixed(2)));
        newAnnualMenSerious[1].push(dataset1.annualMenSerious[1][i]);
    }

    for (let i = 0; i < dataset1.annualWomenSerious[0].length; i++) {
        let valor = dataset1.annualWomenSerious[0][i] - dataset2.annualWomenSerious[0][i];
        newAnnualWomenSerious[0].push(Number(valor.toFixed(2)));
        newAnnualWomenSerious[1].push(dataset1.annualWomenSerious[1][i]);
    }

    const json = JSON.stringify({
        annualTotalTotal: newAnnualTotalTotal,
        annualMenTotal: newAnnualMenTotal,
        annualWomenTotal: newAnnualWomenTotal,
        annualTotalMild: newAnnualTotalMild,
        annualMenMild: newAnnualMenMild,
        annualWomenMild: newAnnualWomenMild,
        annualTotalSerious: newAnnualTotalSerious,
        annualMenSerious: newAnnualMenSerious,
        annualWomenSerious: newAnnualWomenSerious,
        dateModified: dateModified
    });

    return json;
}