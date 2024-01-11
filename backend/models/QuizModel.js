import mongoose from "mongoose";

// Esquema para as opções de resposta
const optionSchema = new mongoose.Schema({
  opcion: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    required: true
  }
});

// Esquema para as perguntas
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [optionSchema]
});

// Esquema para o quiz
const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  questions: [questionSchema]
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
