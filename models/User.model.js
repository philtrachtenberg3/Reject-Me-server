const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture: {type: String},
    challenges: {type: Schema.Types.ObjectId, ref: 'Challenge'},
    comments: {type: Schema.Types.ObjectId, ref: 'Comments'},
    questionnaire: {type: Schema.Types.ObjectId, ref: 'Questionnaire'},
    plans: [{type: Schema.Types.ObjectId, ref: 'Plan'}]
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
