const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoRecaidasDeAccidentesSchema = new Schema({
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
  });
  
module.exports = mongoose.model('NoRecaidasDeAccidentes', NoRecaidasDeAccidentesSchema, 'NoRecaidasDeAccidentes');