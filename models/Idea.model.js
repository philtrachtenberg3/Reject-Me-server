const { Schema, model } = require("mongoose");

const ideaSchema = new Schema(
  {
    idea: {type: String, required: true},
    difficultyLevel: {type: String, enum: ['anxiety-inducing','stressful af', 'mt everest of rejection']},
    category: {type: String, enum: ['Social Rejection','Failure','Pushing outside your comfort zone']}
  },
  { timestamps: true }
);

const Idea = model("Idea", ideaSchema);

module.exports = Idea;
