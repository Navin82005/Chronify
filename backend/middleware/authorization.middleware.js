import { frontend } from "../../client_config.js";
import { verifyJWTToken } from "../services/auth.service.js";

export const authorizationMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.path}`);
    const paramData = new URLSearchParams(req.headers.cookie);
    const access_token = paramData.get("access_token");


    // console.log("Method: " + req.method);
    // console.log("access_token: " + access_token);

    if (req.method === "POST") {
        if (verifyJWTToken(access_token).status) {
            return next();
        } else {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }
    }

    next();
}

export default authorizationMiddleware;
