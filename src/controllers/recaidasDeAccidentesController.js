const recaidasDeAccidentes = require("../../models/recaidasDeAccidentes")

const getRecaidasDeAccidentes = async (req, res) => {
    const dataset = await recaidasDeAccidentes.find();
    res.json(dataset);
}

module.exports = {
    getRecaidasDeAccidentes
}