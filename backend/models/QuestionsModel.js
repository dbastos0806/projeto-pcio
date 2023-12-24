import mongoose from "mongoose";

const optionsSchema = mongoose.Schema({
    opcion: {
        type: String,
        required: true
    },
    correct: {
        type: Boolean,
        required: true
    },
}, {
    _id: false
});

const questionsSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [optionsSchema],
        required: true
    },
});

export default questionsSchema;