import Quiz from "../models/QuizModel.js";

//create
export const createQuiz = async (req, res) => {
    try {
            if(
                !req.body.name
            ) {
                return res.status(400).send({
                    message: "Quiz name can not be empty"
                });
            }
            const quizObj = new Quiz({
                name: req.body.name,
                questions: req.body.questions,
            });
            const savedQuiz = await quizObj.save();
            res.status(201).json({
                massage: "Quiz created successfully",
                quiz: savedQuiz,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Some error occurred while creating the Quiz."
            });
        }
}

//read all
export const findAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        quizzes.forEach(element => {
            element["number_of_questions"] = element.questions.length;
           //element.questions = undefined; 
        });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving quizzes."
        });
    }
}

//read one
export const findOneQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving quiz."
        });
        };
}

//update
export const updateQuiz = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Quiz content can not be empty"
        });
    }
    try {
        const id = req.params.id;
        //findByIdAndUpdate
        const data = await Quiz.findByIdQuiz(id, req.body, {
            new: true
            });
        if(!data) {
            res.status(404).send({
                message: `Cannot update Quiz with id=${id}. Maybe Quiz was not found!`
            });
        }
        res.send({
            message: "Quiz was updated successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating Quiz with id=" + id
        });
    }
}

//delete
export const deleteQuiz = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Quiz.findByIdAndDelete({ _id: id });
        if(!request) {
            return res.status(404).send({
                message: `Cannot delete Quiz with id=${id}. Maybe Quiz was not found!`
            });
        }
        res.send({
            message: "Quiz was deleted successfully!",
        });
    } catch (error) {
        res.status(500).send({
            message: "Could not delete Quiz with id=" + id
        });
    }
}