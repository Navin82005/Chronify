import { client_config } from "../client_config.js";

const googleOAuthURL = () => {
    const rootURL = client_config.Google.auth_uri;

    const options = {

    }
    const queryString = new URLSearchParams(options);

    return `${rootURL}?${queryString.toString()}`;
}

console.log("Google Auth URL" + googleOAuthURL());