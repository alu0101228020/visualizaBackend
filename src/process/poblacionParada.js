const axios = require('axios');
var cron = require('node-cron');
const insertData = require('../services/poblacionParadaService');
const CRON_TIME = require('../utils/constants');

cron.schedule(CRON_TIME, () => {
    axios.get('https://datos.canarias.es/catalogos/general/api/action/package_show?id=36eccfaa-cc88-4139-84ff-c978ff5e5108', {}).then (response => {
        let url = '';
        for (let i = 0; i < response.data.result.resources.length; i++) {
            if (response.data.result.resources[i].format === 'JSON') {
                url = response.data.result.resources[i].access_url;
            }
        }
        axios.get(url, {}).then (response2 => {
            let datasetProcessed = processDataset(response2);
            insertData(datasetProcessed);

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
    });

    return json;
}