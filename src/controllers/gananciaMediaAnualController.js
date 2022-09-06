const gananciaMediaAnual = require("../../models/gananciaMediaAnual")

const getGananciaMediaAnual = async (req, res) => {
    const dataset = await gananciaMediaAnual.find();
    res.json(dataset);
}

module.exports = {
    getGananciaMediaAnual
}