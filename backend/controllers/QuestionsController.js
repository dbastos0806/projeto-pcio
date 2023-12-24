import Question from '../models/QuestionsModel.js';

//read one
export const findOneQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving question."
        });
        };
}

//read all
export const findAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving questions."
        });
    }
}


//update
export const updateQuestion = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Question content can not be empty"
        });
    }
    try {
        const id = req.params.id;
        //findByIdAndUpdate
        const data = await Question.findByIdAndUpdate(id, req.body, {
            new: true
            });
        if(!data) {
            res.status(404).send({
                message: `Cannot update Question with id=${id}. Maybe Question was not found!`
            });
        }
        res.send({
            message: "Question was updated successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating Question with id=" + id
        });
    }
}

//delete
export const deleteQuestion = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Question.findByIdAndDelete({ _id: id });
        if(!request) {
            return res.status(404).send({
                message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
            });
        }
        res.send({
            message: "Question was deleted successfully!",
            data: data,
        });
    } catch (error) {
        res.status(500).send({
            message: "Could not delete Question with id=" + id
        });
    }
}