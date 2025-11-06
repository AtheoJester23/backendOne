import Users from "../models/users.js";
import bcrypt, { hash } from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

//GET all:
export const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET specific user:
export const getSpecificUser = async (req, res) => {
  res.status(200).json(req.user);
};

//POST request user:
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All inputs are required..." });
    }

    //Validate email:
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }

    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists." });
    }

    //Hash password:
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    //Account overview:
    const createdAccount = new Users({
      name,
      email,
      password: hashedPassword,
    });

    //Create the account:
    const addedAccount = await createdAccount.save();

    //Exclude password from the response:
    const { password: _, ...data } = addedAccount.toObject();

    res.status(201).json({
      message: "Account Successfully Created...",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//PATCH request:
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name && name.trim() !== "") {
      req.user.name = name;
    }

    //Validate Email:
    if (email) {
      if (validator.isEmail(email)) {
        req.user.email = email;
      } else {
        return res.status(400).json({ message: "Invalid Email Address" });
      }
    }

    if (password && password.trim() !== "") {
      //hashpassword:
      const saltrounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltrounds);

      req.user.password = hashedPassword;
    }

    //Update User Account Details:
    const updatedUser = await req.user.save();

    //Exclude Password From The Response:
    const { password: _, ...data } = updatedUser.toObject();

    res.status(200).json({
      message: "User Details Updated Successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE request:
export const deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();

    res.status(200).json({ message: "User Deleted Successfully..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//--------------------------------------------------------------------
//Login:
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
