import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import ToggleTheme from "../components/ToggleTheme";
import "../index.css";
import Footer from '../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate();
    const { authToken, setAuthToken, isLoggedIn, setIsLoggedIn } = useAuth();
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Profile, setProfile] = useState("");
    const [Role, setRole] = useState('0');
    const [alertType, setAlert] = useState('alert_hidden');
    const [Response, setResponse] = useState("");
    const [Picture, setPicture] = useState("");
    
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            const fileUrl = response.data.url;
            setPicture(fileUrl);
            console.log('File uploaded:', fileUrl);
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

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

                setFirstName(response.data.FirstName);
                setLastName(response.data.LastName);
                setPhone(response.data.tel);
                setEmail(response.data.email);
                setRole(response.data.role || '0');
                setProfile(response.data.profile_pic);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [authToken]);

    const submitData = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put("http://127.0.0.1:5000/api/user", {
                FirstName,
                LastName,
                username: Email,
                email: Email,
                password: Password,
                newPassword: NewPassword,
                confirmPassword: ConfirmPassword,
                tel: Phone,
                role: Role,
                profile_pic: Picture // Ensure this is correctly set
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': authToken,
                }
            });

            if (response.status === 200) {
                console.log("User updated:", JSON.stringify(response.data));
                setResponse(`User updated: ${response.data._id}`);
                setAlert("alert-success alert_display");

                setTimeout(() => {
                    setAlert("alert_hidden");
                }, 6000);
            } else {
                setResponse(JSON.stringify(response.data, null, 2));
                setAlert("alert-warning alert_display");
                setTimeout(() => {
                    setAlert("alert_hidden");
                }, 6000);
            }
        } catch (error) {
            console.error("Error:", error);
            setAlert("alert-error alert_display");
            if (error.response && error.response.data) {
                setResponse(JSON.stringify(error.response.data, null, 2));
                if (error.response.status === 409) setAlert("alert-warning alert_display");
            } else {
                setResponse("Message: We encountered some errors. Please check your inputs and try again.");
            }
            setTimeout(() => {
                setAlert("alert_hidden");
            }, 6000);
        }
    };

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, isLoggedIn, navigate]);

    if (authToken) {
        return (
            <>
                <ToggleTheme />
                <Navbar btnSignup="none" btnLogin="none" />
                <div className='container p-2 mx-auto relative'>
                    <div role="alert" className={`alert absolute right-0 w-2/5 overflow-hidden ${alertType}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{Response}</span>
                    </div>
                    <form onSubmit={submitData} className='my-7'>
                        <h3 className='text-xl font-bold text-center mb-4'>Profile:</h3>
                        <div role="alert" className="alert alert-info w-1/2 mx-auto">
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
                            <span>Changer les informations en relation avec votre compte</span>
                        </div>
                        <div className="px-14">
                            <label className="input input-bordered flex items-center gap-2 my-3 w-1/2 mx-auto">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Nom"
                                    value={FirstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 w-1/2 mx-auto">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Prenom"
                                    value={LastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 w-1/2 mx-auto">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Telephone"
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 w-1/2 mx-auto">
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
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 my-3 w-1/2 mx-auto">
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
                                <input
                                    type="password"
                                    className="grow"
                                    placeholder="Current Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 w-1/2 mx-auto">
                                <input
                                    type="password"
                                    className="grow"
                                    placeholder="New Password"
                                    value={NewPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-3 w-1/2 mx-auto">
                                <input
                                    type="password"
                                    className="grow"
                                    placeholder="Confirm New Password"
                                    value={ConfirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </label>
                            <select
                                value={Role}
                                className="select select-primary w-1/2 block my-3 mx-auto"
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option disabled value="0">Agent ou Utilisateur ?</option>
                                <option value="agent">Agent</option>
                                <option value="user">Utilisateur</option>
                            </select>
                            <div className='flex justify-center content-center items-center gap-4 '>
                                <span className='font-semibold'>Profile:</span>
                                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                            </div>
                        </div>
                        <button className="btn btn-active btn-primary block my-3 mx-auto">Sauvegarder</button>
                    </form>
                </div>
                <Footer />
            </>
        );
    }

    return null;
}

export default EditProfile;
