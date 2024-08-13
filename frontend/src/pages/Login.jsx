import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../index.css';
import Footer from '../components/Footer';
import ToggleTheme from '../components/ToggleTheme';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
function Login() {
    const {
        authToken, 
        setAuthToken,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth();
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertType, setAlertType] = useState('alert_hidden');
    useEffect(()=>{
        if (isLoggedIn && authToken) {
            navigate("/dashboard");
        }
    })
    const submitData = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("https://backend-hgsc.onrender.com/api/auth/login", {
                username: email,
                password: password
            });
            
            if (response.status === 200) {
                localStorage.setItem("authToken", response.data.token);
                const userId = `${response.data.user.FirstName} ${response.data.user.LastName}`;
                setAuthToken(response.data.token);
                setIsLoggedIn(true)
                toast.success(`User: ${userId}`);
            } else {
                toast.error(JSON.stringify(response.data, null, 2));
                
            }
        } catch (error) {
            console.error("Error:", error);

            if (error.response && error.response.data) {
                toast.error(JSON.stringify(error.response.data, null, 2)); 
               
            } else {
                toast.error("Message: We encountered some errors. Please check your inputs and try again.");
            }
        }
    };
    
    if (!isLoggedIn || !authToken) {
        return (
            <>
                <ToggleTheme />
                
                <Navbar btnLogin="none" btnLogout="none"     />
                <div className='container p-2 mx-auto relative'>
                 
                    <form onSubmit={submitData} className='my-7'>
                        <h3 className='text-xl font-bold  text-center mb-4'>Connectez-vous :</h3>
                        <div role="alert" className="alert alert-info md:w-1/2 mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Entrez votre e-mail et mot de passe.</span>
                        </div>
                        <div className="mx-auto md:w-3/4">
                            <label className="input input-bordered flex items-center gap-2 my-6 md:w-1/2 mx-auto h-16">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-6 md:w-1/2 mx-auto h-16">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                </svg>
                                <input type="password" className="grow" placeholder="Le mot de passe" onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                        </div>
                         <div className="flex justify-end md:w-1/2 mx-auto">
                             <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-link " onClick={()=> navigate("/signup") ; }>S'inscrire</button>
                        </div>
                        <button className="btn btn-active btn-primary block my-3 w-3/4 md:w-auto mx-auto">Se connecter</button>
                    </form>
                </div>
                <Footer />
                <Toaster />
            </>
        );
    } 
}

export default Login;
