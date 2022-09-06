const axios = require('axios');
var cron = require('node-cron');
const insertData = require('../services/poblacionActivaService');
let CRON_TIME = require('../utils/constants');

cron.schedule(CRON_TIME, () => {
    axios.get('https://datos.canarias.es/catalogos/general/api/action/package_show?id=57a0d10d-ef27-4128-a294-83bab804dd76', {}).then (response => {
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
            axios.get('http://localhost:3200/api/empleo/poblacionActiva', {}).then (response3 => {
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
    let annualWomen = [[], []];
    let annualMen = [[], []];
    let annualTotal = [[], []];

    let quarterlyWomen = [[], []];
    let quarterlyMen = [[], []];
    let quarterlyTotal = [[], []];

    let dateModified = '';

    dataset.data.categories.forEach(category => {
        if (category.variable === 'Periodos') {
            dateModified = category.codes[0];
        }
    });

    for (const dataObj of dataset.data.data) {
        if (dataObj.dimCodes[0] === "T" && dataObj.dimCodes[1].length === 4) {
            if (dataObj.dimCodes[2] === "T") {
                annualTotal[0].push(parseFloat(dataObj.Valor))
                annualTotal[1].push(dataObj.dimCodes[1])
            }
            if (dataObj.dimCodes[2] === "M") {
                annualMen[0].push(parseFloat(dataObj.Valor))
                annualMen[1].push(dataObj.dimCodes[1])
            }
            if (dataObj.dimCodes[2] === "F") {
                annualWomen[0].push(parseFloat(dataObj.Valor))
                annualWomen[1].push(dataObj.dimCodes[1])
            }
        }
        if (dataObj.dimCodes[0] === "T" && dataObj.dimCodes[1].length === 6) {
            if (dataObj.dimCodes[2] === "T") {
                quarterlyTotal[0].push(parseFloat(dataObj.Valor))
                quarterlyTotal[1].push(dataObj.dimCodes[1])
            }
            if (dataObj.dimCodes[2] === "M") {
                quarterlyMen[0].push(parseFloat(dataObj.Valor))
                quarterlyMen[1].push(dataObj.dimCodes[1])
            }
            if (dataObj.dimCodes[2] === "F") {
                quarterlyWomen[0].push(parseFloat(dataObj.Valor))
                quarterlyWomen[1].push(dataObj.dimCodes[1])
            }
        }
    }

    const json = JSON.stringify({
        annualTotal: annualTotal,
        annualMen: annualMen,
        annualWomen: annualWomen,
        quarterlyTotal: quarterlyTotal,
        quarterlyMen: quarterlyMen,
        quarterlyWomen: quarterlyWomen,
        dateModified: dateModified
    });

    return json;
}