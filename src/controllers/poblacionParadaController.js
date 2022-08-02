const poblacionParada = require("../../models/poblacionParada")

const getPoblacionParada = async (req, res) => {
    const dataset = await poblacionParada.find();
    res.json(dataset);
}

module.exports = {
    getPoblacionParada
}