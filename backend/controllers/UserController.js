import User from "../models/UserModel.js";

//create
export const createUser = async (req, res) => {
    try {
            if(
                !req.body.email ||
                !req.body.firstName ||
                !req.body.lastName ||
                !req.body.phone
            ) {
                return res.status(400).send({
                    message: "User email can not be empty"
                });
            }
        const userObj = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
        });
        
        const savedUser = await userObj.save();
        res.status(201).json({
            massage: "User created successfully",
            user: savedUser,
        });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Some error occurred while creating the User."
            });
        }
}

//read all
export const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving users."
        });
    }
}

//read one
export const findOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving user."
        });
        };
}

//update
export const updateUser = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    try{
        const id = req.params.id;
        //findByIdAndUpdate
        const data = await User.findByIdAndUpdate(id, req.body, {
                new: true
            });
            if(!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            }
            res.send({
                message: "User was updated successfully",
                data: data,
            });
    } catch (error) {
        res.status(500).send({
            message: "Error updating User with id=" + req.params.id
        });
    }
}

//delete
export const deleteUser = async (req, res) => {
    const id = req.params.id;
  
    try {  
      const request = await User.findOneAndDelete({ _id: id });
      if (!request) {
        return res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
      res.send({
        message: "User was deleted with success!",
      });
    } catch (error) {
      res.status(500).send({
        message: "Could not delete User with id=" + req.params.id,
      });
    }
}

