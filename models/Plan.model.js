const { Schema, model } = require("mongoose");

const planSchema = new Schema(
{
    challenges: [{type: Schema.Types.ObjectId, ref: 'Challenge'}],
    },
  { timestamps: true }
);

const Plan = model("Plan", planSchema);

module.exports = Plan;
