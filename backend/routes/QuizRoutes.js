import express from "express";
import {createQuiz , findAllQuizzes , findOneQuiz , updateQuiz , deleteQuiz } from '../controllers/QuizController.js';

const QuizRoutes = express.Router();

//create
QuizRoutes.post("/create", createQuiz);

//read all
QuizRoutes.get("/", findAllQuizzes);

//read one
QuizRoutes.get("/:id", findOneQuiz);

//update
QuizRoutes.patch("/:id", updateQuiz);

//delete
QuizRoutes.delete("/:id", deleteQuiz);

export default QuizRoutes;