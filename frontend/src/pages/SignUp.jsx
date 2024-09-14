import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import ToggleTheme from "../components/ToggleTheme";
import "../index.css";
import Footer from '../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
function SignUp() {


    const navigate = useNavigate();
    const {
        authToken, 
        setAuthToken,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth();
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Role, setRole] = useState('0');


    const submitData = async (event) => {
        event.preventDefault();
        await axios.post("https://backend-hgsc.onrender.com/api/auth/signup", {
            FirstName,
            LastName,
            username: Email,
            email: Email,
            password: Password,
            confirmPassword: ConfirmPassword,
            tel: Phone,
            role: Role
        })
        .then(function (response) {
            if (response.status === 201) {
                const userId = response.data.user._id;
                toast.success(`UserCreated: ${userId}`);
                localStorage.setItem("token", response.data.token);
                setAuthToken(response.data.token);
                setIsLoggedIn(true);
                
            } else {
                toast.error(JSON.stringify(response.data, null, 2));
                
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
           
            if (error.response && error.response.data) {
                toast.error(JSON.stringify(error.response.data, null, 2));

            } else {
                toast.error("Message: We encountered some errors. Please check your inputs and try again.");
            }
            
        });
    };

    useEffect(() => {
        if (authToken && isLoggedIn) {
            navigate("/dashboard");
        }
    }, [authToken, isLoggedIn, navigate]);

    if (!authToken || !isLoggedIn) {
        return (
            <>
                <ToggleTheme />
                <Navbar btnSignup="none" btnLogout="none" />
                <div className='container p-2 mx-auto relative'>
                   
                    <form onSubmit={submitData} className='my-7'>
                        <h3 className='text-xl font-bold text-center mb-4'>Créer un compte :</h3>
                        <div role="alert" className="alert alert-info md:w-1/2 mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 shrink-0 stroke-current">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>En utilisant l'authentification facile, vous pouvez remplir vos données supplémentaires ultérieurement dans les paramètres de votre compte.</span>
                        </div>
                        <div className="px-4 md:px-14">
                            <label className="input input-bordered flex items-center gap-2 my-3 md:w-1/2 mx-auto">
                                <input type="text" className="grow" placeholder="Nom" onChange={(e) => setFirstName(e.target.value)} required />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 md:w-1/2 mx-auto">
                                <input type="text" className="grow" onChange={(e) => setLastName(e.target.value)} placeholder="Prenom" required />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 md:w-1/2 mx-auto">
                                <input type="text" className="grow" placeholder="Telephone" onChange={(e) => setPhone(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 md:w-1/2 mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path
                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 my-3 md:w-1/2 mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <input type="password" className="grow" placeholder="Le mot de passe" onChange={(e) => setPassword(e.target.value)} required />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 md:w-1/2 mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <input type="password" className="grow" placeholder="Confirmer le mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </label>

                            <select defaultValue="0" className="select select-primary md:w-1/2 block my-3 mx-auto" onChange={(e) => setRole(e.target.value)} required>
                                <option disabled value="0">Agent ou Utilisateur ?</option>
                                <option value="agent">Agent</option>
                                <option value="user">Utilisateur</option>
                            </select>
                        </div>
                        <div className="flex justify-end md:w-1/2 mx-auto">
                            <a className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-link" href="/login">Se connecter</a>
                         </div>
                        <button className="btn btn-active btn-accent block my-3 mx-auto" >Créer un compte</button>
                    </form>
                </div>
                <Footer />
                <Toaster />
            </>
        );
    }

    return null;
}

export default SignUp;
