const distintasTasas = require("../../models/distintasTasas")

const getDistintasTasas = async (req, res) => {
    const dataset = await distintasTasas.find();
    res.json(dataset);
}

module.exports = {
    getDistintasTasas
}