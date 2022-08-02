const accidentesDeTrabajo = require("../../models/accidentesDeTrabajo")

const getAccidentesDeTrabajo = async (req, res) => {
    const dataset = await accidentesDeTrabajo.find();
    res.json(dataset);
}

module.exports = {
    getAccidentesDeTrabajo
}