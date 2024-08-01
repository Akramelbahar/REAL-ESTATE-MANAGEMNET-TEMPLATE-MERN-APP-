import axios from 'axios';

export const UserRole = async (authToken) => {
  try {
    const response = await axios.get('https://backend-hgsc.onrender.com/api/user/role',  {
      headers: {
        'Content-Type': 'application/json',
        'token': authToken,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};
