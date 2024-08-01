import axios from 'axios';

export const UserRole = async (authToken) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/user/role',  {
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
