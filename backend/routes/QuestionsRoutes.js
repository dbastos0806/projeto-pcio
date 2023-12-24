import express from "express";
import {findOneQuestion , updateQuestion , deleteQuestion } from '../controllers/QuestionsController.js';

const QuestionRoutes = express.Router();

//read one
QuestionRoutes.get("/:id", findOneQuestion);

//update
QuestionRoutes.patch("/:id", updateQuestion);

//delete
QuestionRoutes.delete("/:id", deleteQuestion);

export default QuestionRoutes;
