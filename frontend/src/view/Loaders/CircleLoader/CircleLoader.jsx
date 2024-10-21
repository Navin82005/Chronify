import React from 'react'

import "./CircleLoader.scss";

import logo from "../../../assets/chronify-icon.png";

const CircleLoader = () => {
    return (
        <div>
            <div className='circle-loader-container-parent'>
                <img src={logo} alt='Chronify' />
                <div className="circle-loader-container">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default CircleLoader