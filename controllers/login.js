import Users from "../models/users.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All inputs are required..." });
    }

    //Email Validation:
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid Email Address" });
    }

    //Check if the user exist:
    const userExist = await Users.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //Check password:
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //Exclude Password from response
    const { password: _, ...data } = userExist.toObject();

    //JWT Generation:
    const token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    //Send Response:
    res.status(200).json({
      message: "Login Successful",
      user: data,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All inputs are required..." });
    }

    //Verify Email:
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //Check if the user exist:
    const userExist = await Users.findOne({ email }).select("+password");
    if (!userExist) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //Password Verify:
    const checkPass = await bcrypt.compare(password, userExist.password);
    if (!checkPass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //Exclude Password from Response:
    const { password: _, ...data } = userExist.toObject();

    //Generate JWT:
    const Token = jwt.sign(
      { id: userExist._id, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    //The Response:
    res.status(200).json({
      message: "Login Successful",
      Token,
      user: data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
