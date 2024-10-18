import axios from "axios";
import qs from "qs";

import GoogleUser from "../model/google-user.model.js";

import { client_config } from "../../client_config.js";
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
        console.log("Error Creating Common User", error.message);
    }
}