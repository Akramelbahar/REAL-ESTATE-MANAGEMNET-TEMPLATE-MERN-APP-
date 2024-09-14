import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function LogOut() {
    const navigate = useNavigate();
    const { setAuthToken, setIsLoggedIn } = useAuth();

    useEffect(() => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("authToken");
        setAuthToken(null);
        setIsLoggedIn(false);
        navigate("/dashboard");
    }, [navigate, setAuthToken, setIsLoggedIn]);

    return null;
}

export default LogOut;