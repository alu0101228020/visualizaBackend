const axios = require('axios');
var cron = require('node-cron');
const insertData = require('../services/accidentesDeTrabajoService');
let CRON_TIME = require('../utils/constants');

cron.schedule(CRON_TIME, () => {
    axios.get('https://datos.canarias.es/catalogos/general/api/action/package_show?id=40bfa37e-d355-49f2-aecf-8b50e44166fa', {}).then (response => {
        let url = '';
        for (let i = 0; i < response.data.result.resources.length; i++) {
            if (response.data.result.resources[i].format === 'JSON') {
                url = response.data.result.resources[i].access_url;
            }
        }
        axios.get(url, {}).then (response2 => {
            let dateModified = '';
            response2.data.categories.forEach(category => {
                if (category.variable === "Años") {
                    dateModified = String(category.codes[0]);
                }
            });
            axios.get('http://localhost:3200/api/empleo/accidentesDeTrabajo', {}).then (response3 => {
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
    let annualWomenTotal = [[], []];
    let annualMenTotal = [[], []];
    let annualTotalTotal = [[], []];

    let annualWomenMild = [[], []];
    let annualMenMild = [[], []];
    let annualTotalMild = [[], []];

    let annualWomenSerious = [[], []];
    let annualMenSerious = [[], []];
    let annualTotalSerious = [[], []];

    let annualWomenMortal = [[], []];
    let annualMenMortal = [[], []];
    let annualTotalMortal = [[], []];

    let dateModified = '';

    dataset.data.categories.forEach(category => {
        if (category.variable === 'Años') {
            dateModified = category.codes[0];
        }
    });

    for (const dataObj of dataset.data.data) {
        if (dataObj.dimCodes[0] === "ES70" && dataObj.dimCodes[1] === "T") {
            if (dataObj.dimCodes[3] === "T") {
                annualTotalTotal[0].push(parseInt(dataObj.Valor))
                annualTotalTotal[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "M") {
                annualMenTotal[0].push(parseInt(dataObj.Valor))
                annualMenTotal[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "F") {
                annualWomenTotal[0].push(parseInt(dataObj.Valor))
                annualWomenTotal[1].push(dataObj.dimCodes[2])
            }
        }

        if (dataObj.dimCodes[0] === "ES70" && dataObj.dimCodes[1] === "1") {
            if (dataObj.dimCodes[3] === "T") {
                annualTotalMild[0].push(parseInt(dataObj.Valor))
                annualTotalMild[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "M") {
                annualMenMild[0].push(parseInt(dataObj.Valor))
                annualMenMild[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "F") {
                annualWomenMild[0].push(parseInt(dataObj.Valor))
                annualWomenMild[1].push(dataObj.dimCodes[2])
            }
        }

        if (dataObj.dimCodes[0] === "ES70" && dataObj.dimCodes[1] === "2_3") {
            if (dataObj.dimCodes[3] === "T") {
                annualTotalSerious[0].push(parseInt(dataObj.Valor))
                annualTotalSerious[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "M") {
                annualMenSerious[0].push(parseInt(dataObj.Valor))
                annualMenSerious[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "F") {
                annualWomenSerious[0].push(parseInt(dataObj.Valor))
                annualWomenSerious[1].push(dataObj.dimCodes[2])
            }
        }

        if (dataObj.dimCodes[0] === "ES70" && dataObj.dimCodes[1] === "4") {
            if (dataObj.dimCodes[3] === "T") {
                annualTotalMortal[0].push(parseInt(dataObj.Valor))
                annualTotalMortal[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "M") {
                annualMenMortal[0].push(parseInt(dataObj.Valor))
                annualMenMortal[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[3] === "F") {
                annualWomenMortal[0].push(parseInt(dataObj.Valor))
                annualWomenMortal[1].push(dataObj.dimCodes[2])
            }
        }
    }

    const json = JSON.stringify({
        annualTotalTotal: annualTotalTotal,
        annualMenTotal: annualMenTotal,
        annualWomenTotal: annualWomenTotal,
        annualTotalMild: annualTotalMild,
        annualMenMild: annualMenMild,
        annualWomenMild: annualWomenMild,
        annualTotalSerious: annualTotalSerious,
        annualMenSerious: annualMenSerious,
        annualWomenSerious: annualWomenSerious,
        annualTotalMortal: annualTotalMortal,
        annualMenMortal: annualMenMortal,
        annualWomenMortal: annualWomenMortal,
        dateModified: dateModified
    });

    return json;
}