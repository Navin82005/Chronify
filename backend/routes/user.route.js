import express from "express";
import bcrypt from "bcrypt";

import User from "../model/user.model.js";

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