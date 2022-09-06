const poblacionActiva = require("../../models/poblacionActiva")

const getPoblacionActiva = async (req, res) => {
    const dataset = await poblacionActiva.find();
    res.json(dataset);
}

module.exports = {
    getPoblacionActiva
}