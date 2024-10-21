import axios from "axios";

import { react_config } from "../config.js";


export const getProfileData = async () => {
    try {
        const response = await axios.get(`${react_config.backend_url}/api/user/`);

        const body = response.data;
        if (!body.error) {
            localStorage.setItem('user', JSON.stringify(body.data));
        }
        return response.data;
    } catch (error) {
        console.log(`Error in fetching ${react_config.backend_url}/api/user/: `, error.message);
        return { error: true, message: error.message };
    }
}