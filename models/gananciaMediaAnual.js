const mongoose = require('mongoose');
const { Schema } = mongoose;

const GananciaMediaAnualSchema = new Schema({
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
    annualTotalInd: {
      type: [
        Array
      ]
    },
    annualMenInd: {
      type: [
        Array
      ]
    },
    annualWomenInd: {
      type: [
        Array
      ]
    },
    annualTotalConst: {
        type: [
          Array
        ]
      },
      annualMenConst: {
        type: [
          Array
        ]
      },
      annualWomenConst: {
        type: [
          Array
        ]
      },
      annualTotalServ: {
        type: [
          Array
        ]
      },
      annualMenServ: {
        type: [
          Array
        ]
      },
      annualWomenServ: {
        type: [
          Array
        ]
      }
  });
  
module.exports = mongoose.model('GananciaMediaAnual', GananciaMediaAnualSchema, 'GananciaMediaAnual');