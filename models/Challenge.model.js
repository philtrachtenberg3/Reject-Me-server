const { Schema, model } = require("mongoose");

const challengeSchema = new Schema(
{
    username: {type: Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: true },
    day: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    video: {type: String},
    journalEntry: {type: String},
    comments: {type: Schema.Types.ObjectId, ref: 'Comments'},
    isCompleted: {type: Boolean},
    wasRejected: {type: Boolean}
    },
  { timestamps: true }
);

const Challenge = model("Challenge", challengeSchema);

module.exports = Challenge;
