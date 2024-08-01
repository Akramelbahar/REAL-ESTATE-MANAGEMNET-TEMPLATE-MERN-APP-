import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function Profile() {
  const { authToken } = useAuth();
  const [Name, setName] = useState("");
  const [Profile, setProfile] = useState("");
  const [Role, setRole] = useState("");
  if(!authToken)return ("")
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user/', {
          headers: {
            'Content-Type': 'application/json',
            'token': authToken,
          },
          withCredentials: true,
        });
        
        setName(response.data.LastName + " "+response.data.FirstName);
        setProfile(response.data.profile_pic);
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [authToken]);

  return (
    <div className="hover:tooltip hover:tooltip-open hover:tooltip-bottom hover:tooltip-info " data-tip={Name.substring(0,30) !=Name ?Name.substring(0,30) +"... , "+Role :Name +" , "+Role }>
        <div className="avatar">
            <div className="w-8 rounded">
                <img
                src={Profile}
                alt="Profile" />
            </div>

        </div>
    </div>
  );
}

export default Profile;
