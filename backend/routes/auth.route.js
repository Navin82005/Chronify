import express from "express";
import { googleOAuthURL, setGoogleSession } from "../controller/oauth.controller.js";

const authRoute = express.Router();

authRoute.get("/google/session", async (req, res) => {
    await setGoogleSession(res, req.query.code);

    return res.status(200).json({ error: false, query: req.query });
})

authRoute.get("/google", (req, res) => {
    return res.redirect(googleOAuthURL());
})

export default authRoute;
