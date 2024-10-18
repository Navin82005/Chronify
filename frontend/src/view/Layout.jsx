import React, { Fragment } from 'react'
import NavBar from './NavBar/NavBar'
import { Routes, Route } from 'react-router-dom';
import Login from './login/Login';


const Layout = () => {
    return (<Fragment>
        <NavBar />
        <div>Layout</div>
        <Routes>
            <Route path='/login' Component={Login} />
        </Routes>
    </Fragment>
    )
}

export default Layout