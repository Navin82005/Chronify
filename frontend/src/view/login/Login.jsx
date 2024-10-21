import React from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom';


import { react_config } from '../../config';
import chronify_icon from "../../assets/chronify-icon-sm.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

axios.defaults.withCredentials = true;

const Login = () => {
    console.log(`react_config: ${react_config.backend_url}/auth/google`);

    return (
        <div className='h-full h-screen w-screen'>
            <div className='flex justify-between px-5 py-5'>
                <Link to={"/"} className='block w-fit h-fit'>
                    <img className='size-8' src={chronify_icon} alt='Logo' />
                </Link>
            </div>
            <div className='h-36'></div>
            <div className='flex justify-center flex-col items-center text-center'>
                <div className='mb-10'>
                    <h1 className='text-5xl font-nunito-sans font-extrabold'>Chronify</h1>
                    <h1 className='text-xl pt-2 font-nunito-sans font-extrabold'>Your Ultimate Time and Task Manager on the Go!</h1>
                </div>
                <div className='flex-col flex'>
                    <a className='border-2 hover:bg-dark_violet transition-all ease-in-out duration-300 px-20 py-1 font-nunito-sans border-black rounded mb-4' href={`${react_config.backend_url}/auth/google`}>Continue With Google
                        <img className='inline ml-2 size-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt='google-icon' />
                    </a>
                    <a className='border-2 hover:bg-dark_violet transition-all ease-in-out duration-300 px-20 py-1 font-nunito-sans border-black rounded mb-4' href={`${react_config.backend_url}/auth/github`}>Continue With GitHub
                        <img className='inline ml-2 size-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt='github-icon' />
                    </a>
                    <a className='border-2 hover:bg-dark_violet transition-all ease-in-out duration-300 px-20 py-1 font-nunito-sans border-black rounded mb-4' href={`${react_config.backend_url}/auth/discord`}>Continue With Discord
                        <FontAwesomeIcon className='inline ml-2 text-base' icon={faDiscord} style={{ color: "#5865f2" }} />
                    </a>
                </div>
                <div className='h-12'></div>
                <div>
                    <p>Lost your account?</p>
                    <a className='text-dark_violet font-bold' href='mailto:navin82005@gmail.com'>Contact Developer</a>
                    <span className='block pt-5 text-sm'>By signing up with Chronify, you agree to our <a className='underline text-dark_violet' target='_blank' href='/ToCS'>terms of service</a>.</span>
                </div>
            </div>
        </div>
    )
}

export default Login;