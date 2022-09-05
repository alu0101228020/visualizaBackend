const axios = require('axios');
var cron = require('node-cron');
const insertData = require('../services/gananciaMediaAnualService');
let CRON_TIME = require('../utils/constants');

cron.schedule(CRON_TIME, () => {
    axios.get('https://datos.canarias.es/catalogos/general/api/action/package_show?id=a433792c-c7b3-4379-9fa4-f0fc17bddb3b', {}).then (response => {
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
            axios.get('http://localhost:3200/api/empleo/gananciaMediaAnual', {}).then (response3 => {
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
    let annualTotalTotal = [[], []];
    let annualMenTotal = [[], []];
    let annualWomenTotal = [[], []];

    let annualTotalInd = [[], []];
    let annualMenInd = [[], []];
    let annualWomenInd = [[], []];

    let annualTotalConst = [[], []];
    let annualMenConst = [[], []];
    let annualWomenConst = [[], []];

    let annualTotalServ = [[], []];
    let annualMenServ = [[], []];
    let annualWomenServ = [[], []];

    let dateModified = '';

    dataset.data.categories.forEach(category => {
        if (category.variable === 'Periodos') {
            dateModified = category.codes[0];
        }
    });

    for (const dataObj of dataset.data.data.reverse()) {
        if (dataObj.dimCodes[0] === "ES70" && dataObj.dimCodes[3] === "T") {
            if (dataObj.dimCodes[1] === "000000") {
                if (dataObj.Valor != "...") {
                    annualTotalTotal[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualTotalTotal[0].push(0)
                }
                annualTotalTotal[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000001") {
                if (dataObj.Valor != "...") {
                    annualTotalInd[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualTotalInd[0].push(0)
                }
                annualTotalInd[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000002") {
                if (dataObj.Valor != "...") {
                    annualTotalConst[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualTotalConst[0].push(0)
                }
                annualTotalConst[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000003") {
                if (dataObj.Valor != "...") {
                    annualTotalServ[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualTotalServ[0].push(0)
                }
                annualTotalServ[1].push(dataObj.dimCodes[2])
            }
        }

        if (dataObj.dimCodes[0] === "ES70" && dataObj.dimCodes[3] === "M") {
            if (dataObj.dimCodes[1] === "000000") {
                if (dataObj.Valor != "...") {
                    annualMenTotal[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualMenTotal[0].push(0)
                }
                annualMenTotal[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000001") {
                if (dataObj.Valor != "...") {
                    annualMenInd[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualMenInd[0].push(0)
                }
                annualMenInd[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000002") {
                if (dataObj.Valor != "...") {
                    annualMenConst[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualMenConst[0].push(0)
                }
                annualMenConst[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000003") {
                if (dataObj.Valor != "...") {
                    annualMenServ[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualMenServ[0].push(0)
                }
                annualMenServ[1].push(dataObj.dimCodes[2])
            }
        }

        if (dataObj.dimCodes[0] === "ES70" && dataObj.dimCodes[3] === "F") {
            if (dataObj.dimCodes[1] === "000000") {
                if (dataObj.Valor != "...") {
                    annualWomenTotal[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualWomenTotal[0].push(0)
                }
                annualWomenTotal[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000001") {
                if (dataObj.Valor != "...") {
                    annualWomenInd[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualWomenInd[0].push(0)
                }
                annualWomenInd[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000002") {
                if (dataObj.Valor != "...") {
                    annualWomenConst[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualWomenConst[0].push(0)
                }
                annualWomenConst[1].push(dataObj.dimCodes[2])
            }
            if (dataObj.dimCodes[1] === "000003") {
                if (dataObj.Valor != "...") {
                    annualWomenServ[0].push(parseFloat(dataObj.Valor))
                } else {
                    annualWomenServ[0].push(0)
                }
                annualWomenServ[1].push(dataObj.dimCodes[2])
            }
        }
    }


    const json = JSON.stringify({
        annualTotalTotal: annualTotalTotal, 
        annualMenTotal: annualMenTotal,
        annualWomenTotal: annualWomenTotal,
        annualTotalInd: annualTotalInd,
        annualMenInd: annualMenInd,
        annualWomenInd: annualWomenInd,
        annualTotalConst: annualTotalConst,
        annualMenConst: annualMenConst,
        annualWomenConst: annualWomenConst,
        annualTotalServ: annualTotalServ,
        annualMenServ: annualMenServ,
        annualWomenServ: annualWomenServ,
        dateModified: dateModified
    });

    return json;
}