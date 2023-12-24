// Initialize Mongoose

import mongoose from "mongoose";
import questionsSchema from "./QuestionsModel.js";

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questions: [{
        type: [questionsSchema],
        ref: 'Question'
    }]
    });

var Quiz = new mongoose.model("Quiz", schema);

export default Quiz;