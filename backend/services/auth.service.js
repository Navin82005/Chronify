import axios from "axios";
import qs from "qs";
import jwt from "jsonwebtoken";

import { client_config, meta_data } from "../../client_config.js";
import User from "../model/user.model.js";
import OAuthUser from "../model/oauth-user.model.js";

export const getGoogleOAuthTokens = async (code) => {
    const url = client_config.Google.token_uri;

    const values = {
        code,
        client_id: client_config.Google.client_id,
        client_secret: client_config.Google.client_secret,
        redirect_uri: client_config.Google.redirect_uris[0],
        grant_type: "authorization_code",
    }

    try {
        const response = await axios.post(
            url,
            qs.stringify(values),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }
        );

        return response.data;
    } catch (error) {
        console.log("Error in getting tokens: " + error.message);
        console.error("Detailed error:", error.response ? error.response.data : error);
    }
}

export const getGoogleUserInfo = async (id_token, access_token) => {
    try {
        const response = await axios.get(`${client_config.Google.data_url}/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: "Bearer " + id_token
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log("getGoogleUserInfo Error: " + error.message);
    }
}

export const findAndUpdateGoogleUser = async (query, data, options) => {
    return await OAuthUser.findOneAndUpdate(query, data, options);
}

export const configureDefaultUser = async (rawData, authUser) => {
    const findUser = await User.findOne({ email: authUser.userId });
    if (!findUser) {
        const newUser = new User({
            display_name: rawData.name,
            email: rawData.email,
            profile: rawData.picture,
            binded_accounts: [authUser._id],
        });

        try {
            const newSavedUser = await newUser.save();
            return newSavedUser;
        } catch (error) {
            console.log("Error saving new Common User", error.message);
        }
    }
    return findUser;
}

export const getJWTTokens = (user) => {
    const payload = {
        userId: user.email,
        username: user.display_name
    };

    return jwt.sign(
        payload,
        meta_data.jwt_secret,
        { expiresIn: '180d' }
    );
}

export const verifyJWTToken = (access_token) => {
    console.log(access_token);
    
    if (access_token == undefined) {
        return { status: false, user: null };
    }
    try {
        const data = jwt.verify(access_token, meta_data.jwt_secret);
        return { status: true, user: data };
    } catch (error) {
        console.log("Error in verifying access token: " + error.message);
        return { status: false, user: null };
    }
}