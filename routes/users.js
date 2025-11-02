import express from "express";
import Users from "../models/users.js";

//Controllers:
import { getSpecificUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

//GET Request:
router.get("/", getUsers);

//GET Specific user:
router.get("/:id", findUser, getSpecificUser);

//POST Request:

//Middleware:
export async function findUser(req, res, next) {
  let user;

  try {
    user = await Users.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: "User does not exist..." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  req.user = user;
  next();
}

export default router;
