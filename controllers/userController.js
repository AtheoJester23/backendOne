import Users from "../models/users.js";
import express from "express";
import bcrypt from "bcrypt";

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
