const noRecaidasDeAccidentes = require("../../models/noRecaidasDeAccidentes")

const getNoRecaidasDeAccidentes = async (req, res) => {
    const dataset = await noRecaidasDeAccidentes.find();
    res.json(dataset);
}

module.exports = {
    getNoRecaidasDeAccidentes
}