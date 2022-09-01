const { Schema, model } = require("mongoose");

const planSchema = new Schema(
{
    challenges: [{type: Schema.Types.ObjectId, ref: 'Challenge'}],
    questionnaire: {type: Schema.Types.ObjectId, ref: 'Questionnaire'},
    },
  { timestamps: true }
);

const Plan = model("Plan", planSchema);

module.exports = Plan;
