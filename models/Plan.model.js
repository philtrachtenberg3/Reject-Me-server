const { Schema, model } = require("mongoose");

const planSchema = new Schema(
{
    challenges: [{type: Schema.Types.ObjectId, ref: 'Challenge'}],
    questionnaire: {type: Schema.Types.ObjectId, ref: 'Questionnaire'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
    },
  { timestamps: true }
);

const Plan = model("Plan", planSchema);

module.exports = Plan;
