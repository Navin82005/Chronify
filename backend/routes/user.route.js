import express from "express";
import bcrypt from "bcrypt";

import User from "../model/user.model.js";
import { verifyJWTToken } from "../services/auth.service.js";

const userRoutes = express.Router();

userRoutes.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(5);
    const { password, ...otherData } = req.body;
    const password_hash = await bcrypt.hash(password, salt)

    try {
        const newUser = new User({ ...otherData, password_hash: password_hash });
        const userExists = await User.findOne({ email: newUser.email })

        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }
        await newUser.save()
        res.status(201).json({ message: "Success fully created user", data: newUser });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

userRoutes.get('/', async (req, res) => {
    const paramData = new URLSearchParams(req.headers.cookie);
    const access_token = paramData.get("access_token");
    if (!access_token) {
        return res.status(401).json({ error: true, message: "Unauthorized" });
    }
    
    const token_data = verifyJWTToken(access_token);
    if (token_data.status) {
        try {
            console.log("email: token_data.user.email: " + token_data.user.userId);
            const user = await User.findOne({ email: token_data.user.userId });
            if (user) {
                return res.status(200).json({ error: false, data: user });
            }
            console.log("User not found");
            return res.status(401).json({ error: true, message: "Unauthorized" });
        } catch (err) {
            console.log("Error in getting user profile data: " + err.message);
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
})

userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email + " " + password);

    try {
        const userData = await User.findOne({ email: email });
        if (userData) {
            const password_status = await bcrypt.compare(password, userData.password_hash)
            console.log(password_status);
        }
        return res.status(404).json({ message: "Account does not exist" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

export default userRoutes;