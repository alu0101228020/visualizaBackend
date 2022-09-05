const mongoose = require('mongoose');
const { Schema } = mongoose;

const PoblacionParadaSchema = new Schema({
    annualTotal: {
      type: [
        Array
      ]
    },
    annualMen: {
      type: [
        Array
      ]
    },
    annualWomen: {
      type: [
        Array
      ]
    },
    quarterlyTotal: {
      type: [
        Array
      ]
    },
    quarterlyMen: {
      type: [
        Array
      ]
    },
    quarterlyWomen: {
      type: [
        Array
      ]
    },
    dateModified: {
      type: String
    }
  });
  
module.exports = mongoose.model('PoblacionParada', PoblacionParadaSchema, 'PoblacionParada');