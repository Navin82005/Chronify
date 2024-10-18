import React from 'react'
import { react_config } from '../../config';

const Login = () => {
    console.log(`react_config: ${react_config.backend_url}/auth/google`);

    return (
        <div>
            <a href={`${react_config.backend_url}/auth/google`}>Continue With Google</a>
        </div>
    )
}

export default Login