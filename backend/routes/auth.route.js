import express from "express";
import Cookies from 'js-cookie';

import { googleOAuthURL, setSessionTokens } from "../controller/oauth.controller.js";
import { frontend } from "../../client_config.js";
import { verifyJWTToken } from "../services/auth.service.js";


const authRoute = express.Router();

authRoute.get("/google/session", async (req, res) => {
    try {
        const { tokens, user } = await setSessionTokens(res, req.query.code);
        // console.log(tokens);

        res.cookie("access_token", tokens,
            {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "lax",
                secure: false,
            }
        );

        return res.redirect(`${frontend.origin}/profile`);
    } catch (error) {
        console.log("Error in setting cookie or generating tokens: " + error.message);
        try {
            return res.redirect(`${frontend.origin}/access/error`);
        } catch (error) {
            console.log("Headers already sent, cannot redirect.");
        }
    }
})

authRoute.get("/google", (req, res) => {
    // console.log("googleOAuthURL(): " + googleOAuthURL());

    return res.redirect(googleOAuthURL());
})

authRoute.get('/status', (req, res) => {
    const paramData = new URLSearchParams(req.headers.cookie);
    const access_token = paramData.get("access_token");


    // console.log("Method: " + req.method);
    // console.log("access_token: " + access_token);

    const { status, user } = verifyJWTToken(access_token);

    if (status) {
        return res.status(200).json({ error: false, user: user });
    } else {
        return res.status(401).json({ error: true, message: "Unauthorized" });
    }
})

export default authRoute;
