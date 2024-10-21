import React, { useEffect, useState } from 'react'
import { getProfileData } from '../../components/profile.controller.mjs';
import CircleLoader from '../Loaders/CircleLoader/CircleLoader';
import { useNavigate } from 'react-router-dom';

const RenderProfile = ({ profileData }) => {
    console.log("Profile: " + profileData.profile);


    return <><img src={profileData.profile} alt='profile_picture' /></>;
}

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        async function loadUserData(userData) {
            try {
                const body = await getProfileData();
                console.log(body.data);
                if (body.error) {
                    navigator("/login");
                }
                setUserData(body.data);
            } catch (err) {
                console.log("Error loading user data: " + err.message);
            }
        }

        loadUserData();
    }, []);

    return (
        <div>
            {userData == null ? <CircleLoader /> : <RenderProfile profileData={userData} />}
            {/* <CircleLoader /> */}
        </div>
    )
}

export default Profile