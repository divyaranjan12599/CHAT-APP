import express from "express";
import UserModel from "../Models/userModel.js";
import { Error } from "mongoose";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js";
import { InvalidDetails, MissingFieldsError, PasswordNotMatched, UserExistsError } from "../CustomErrors/CustomErrors.js";

export const loginController = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne(username ? { username } : { email });
    // const passMatch = await user.matchPassword(password)
    // console.log(username, email, password, user, passMatch);
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else if (!user) {
        throw new InvalidDetails();
    }
    else {
        throw new PasswordNotMatched();
    }
});

export const registerController = expressAsyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        throw new MissingFieldsError();
    }
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        throw new UserExistsError("User already exists with this email id !!!");
    }

    const userNameExist = await UserModel.findOne({ username });
    if (userNameExist) {
        throw new UserExistsError("Username already taken !!!");
    }

    // console.log(name, username, email, password);
    const user = await UserModel.create({ name, username, email, password });
    // console.log(user);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400);
        throw new Error("Registration Failed!!!");
    }
});

export const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
    // console.log("fetchallusercontroller");
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await UserModel.find(keyword).find({
        _id: { $ne: req.user._id },
    });

    res.send(users);
});