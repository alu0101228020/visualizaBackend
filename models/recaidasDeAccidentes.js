const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecaidasDeAccidentesSchema = new Schema({
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
  
module.exports = mongoose.model('RecaidasDeAccidentes', RecaidasDeAccidentesSchema, 'RecaidasDeAccidentes');