import { client_config, frontend } from "../../client_config.js";
import { configureDefaultUser, findAndUpdateGoogleUser, getGoogleOAuthTokens, getGoogleUserInfo } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export const googleOAuthURL = () => {
    const rootURL = client_config.Google.auth_uri;

    const options = {
        redirect_uri: client_config.Google.redirect_uris[0],
        client_id: client_config.Google.client_id,
        scope: client_config.Google.scope.join(' '),
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
    }
    const queryString = new URLSearchParams(options);

    return `${rootURL}?${queryString.toString()}`;
}

export const setGoogleSession = async (res, code) => {
    try {
        // GETTING TOKENS FROM THE GOOGLE API
        const { id_token, access_token } = await getGoogleOAuthTokens(code);

        // GET USER DATA WITH THE TOKENS
        const rawUserData = await getGoogleUserInfo(id_token, access_token);

        // UPSERT THE USER DATA INTO GOOGLE USER COLLECTION
        const newAuthUser = await findAndUpdateGoogleUser(
            { authId: rawUserData.id },
            { authId: rawUserData.id, userId: rawUserData.email, authType: 'google' },
            { upsert: true, new: true }
        );
        // Updating User Collection
        const newUser = await configureDefaultUser(rawUserData, newAuthUser);
        console.log(newUser);
        console.log(newAuthUser);

        // console.log(googleUser);
    }
    catch (error) {
        console.log(error.message);
        return res.redirect(`${frontend.origin}/auth/google/error`);
    }
    // await getGoogleOAuthTokens(code);
    // console.log({ id_token, access_token });
}
