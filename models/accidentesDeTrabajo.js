const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccidentesDeTrabajoSchema = new Schema({
    annualTotalTotal: {
      type: [
        Array
      ]
    },
    annualMenTotal: {
      type: [
        Array
      ]
    },
    annualWomenTotal: {
      type: [
        Array
      ]
    },
    annualTotalMild: {
      type: [
        Array
      ]
    },
    annualMenMild: {
      type: [
        Array
      ]
    },
    annualWomenMild: {
      type: [
        Array
      ]
    },
    annualTotalSerious: {
      type: [
        Array
      ]
    },
    annualMenSerious: {
      type: [
        Array
      ]
    },
    annualWomenSerious: {
      type: [
        Array
      ]
    },
    annualTotalMortal: {
      type: [
        Array
      ]
    },
    annualMenMortal: {
      type: [
        Array
      ]
    },
    annualWomenMortal: {
      type: [
        Array
      ]
    },
    dateModified: {
      type: String
    }
  });
  
module.exports = mongoose.model('AccidentesDeTrabajo', AccidentesDeTrabajoSchema, 'AccidentesDeTrabajo');