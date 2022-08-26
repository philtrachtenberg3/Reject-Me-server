const { Schema, model } = require("mongoose");

const questionnaireSchema = new Schema(
    {
        username: {type: Schema.Types.ObjectId, ref: 'User'},
        tellAboutYourself: {type: String},
        startDate: {type: Date, required: true},
        category: {type: String, enum: ['Social Rejection','Failure','Pushing outside your comfort zone']},
        reward: {type: String, required: true}
    },
  { timestamps: true }
);

const Questionnaire = model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;