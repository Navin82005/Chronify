import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Import necessary components
import Login from './login/Login';
import Profile from './Profile/Profile';
import Error401 from './Error/LoginError/Error401';
import Sidebar, { SidebarItem } from './Sidebar/Sidebar';
import { FolderKanban, LayoutGrid, UserRound } from 'lucide-react';
import { getProfileData } from '../components/profile.controller.mjs';

const Layout = () => {
    const location = useLocation();
    const navigator = useNavigate();

    const hideSidebarPaths = ['/login', '/auth/google', '/ToCS', '/privacy'];
    const hidePolicy = ['/ToCS', '/privacy'];


    useEffect(() => {
        async function loadUserData(userData) {
            if (!hidePolicy.includes(location.pathname))
                try {
                    const body = await getProfileData();
                    console.log(body);
                    if (body.error) {
                        navigator("/login");
                    }
                } catch (err) {
                    console.log("Error loading user data: " + err.message);
                }
        }

        loadUserData();
    }, []);


    return (
        <div className="flex h-screen w-screen">
            {/* Sidebar */}
            {!hideSidebarPaths.includes(location.pathname) && <Sidebar className="w-64 bg-gray-800 text-white">
                <SidebarItem active={true} alert={true} icon={<LayoutGrid />} text={"Dashboard"} to="/dashboard" />
                <SidebarItem active={false} alert={false} icon={<FolderKanban />} text={"Projects"} to="/projects" />
                <SidebarItem active={false} alert={false} icon={<UserRound />} text={"Profile"} to="/profile" />
            </Sidebar>}

            {/* Content Area */}
            <div className="flex-1 bg-gray-100">
                <Routes>
                    <Route path='/login' Component={Login} />
                    <Route path='/auth/google' Component={Login} />
                    <Route path='/profile' Component={Profile} />
                    <Route path='/access/error' Component={Error401} />
                </Routes>
            </div>
        </div>
    );
}

export default Layout;
