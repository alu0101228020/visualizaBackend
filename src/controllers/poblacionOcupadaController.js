const poblacionOcupada = require("../../models/poblacionOcupada")

const getPoblacionOcupada = async (req, res) => {
    const dataset = await poblacionOcupada.find();
    res.json(dataset);
}

module.exports = {
    getPoblacionOcupada
}