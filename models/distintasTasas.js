const mongoose = require('mongoose');
const { Schema } = mongoose;

const DistintasTasasSchema = new Schema({
    annualTotalExercise: {
      type: [
        Array
      ]
    },
    annualMenExercise: {
      type: [
        Array
      ]
    },
    annualWomenExercise: {
      type: [
        Array
      ]
    },
    annualTotalUnemployment: {
      type: [
        Array
      ]
    },
    annualMenUnemployment: {
      type: [
        Array
      ]
    },
    annualWomenUnemployment: {
      type: [
        Array
      ]
    },
    annualTotalEmployment: {
      type: [
        Array
      ]
    },
    annualMenEmployment: {
      type: [
        Array
      ]
    },
    annualWomenEmployment: {
      type: [
        Array
      ]
    },
    quarterlyTotalExercise: {
      type: [
        Array
      ]
    },
    quarterlyMenExercise: {
      type: [
        Array
      ]
    },
    quarterlyWomenExercise: {
      type: [
        Array
      ]
    },
    quarterlyTotalUnemployment: {
      type: [
        Array
      ]
    },
    quarterlyMenUnemployment: {
      type: [
        Array
      ]
    },
    quarterlyWomenUnemployment: {
      type: [
        Array
      ]
    },
    quarterlyTotalEmployment: {
      type: [
        Array
      ]
    },
    quarterlyMenEmployment: {
      type: [
        Array
      ]
    },
    quarterlyWomenEmployment: {
      type: [
        Array
      ]
    },
    dateModified: {
      type: String
    }
  });
  
module.exports = mongoose.model('DistintasTasas', DistintasTasasSchema, 'DistintasTasas');