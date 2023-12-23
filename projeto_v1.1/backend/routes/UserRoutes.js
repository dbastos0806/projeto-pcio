import express from "express";
import {createUser , findAllUsers , findOneUser , updateUser , deleteUser} from "../controllers/UserController.js";

const UserRoutes = express.Router();

//create
UserRoutes.post("/create", createUser);

//read all
UserRoutes.get("/", findAllUsers);

//read one
UserRoutes.get("/:id", findOneUser);

//update
UserRoutes.patch("/:id", updateUser);

//delete
UserRoutes.delete("/:id", deleteUser);


export default UserRoutes;