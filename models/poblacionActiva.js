const mongoose = require('mongoose');
const { Schema } = mongoose;

const PoblacionActivaSchema = new Schema({
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
    }
  });
  
module.exports = mongoose.model('PoblacionActiva', PoblacionActivaSchema, 'PoblacionActiva');