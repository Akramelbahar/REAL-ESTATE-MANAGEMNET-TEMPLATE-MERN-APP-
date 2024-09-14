import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../components/UserRole';

function AdminDashboard({ DashboardContent }) {
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const [role, setRole] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [adsMenuOpen, setAdsMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const checkUserRole = async () => {
            if (!authToken) {
                navigate("/login");
                return;
            }

            try {
                const userRole = await UserRole(authToken);
                if (userRole !== "admin") {
                    navigate("/");
                } else {
                    setRole(userRole);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
                navigate("/error"); 
            }
        };

        checkUserRole();
    }, [authToken, navigate]);

    const handleMenuClick = (path) => {
        navigate(path);
        setDropdownOpen(false);
    };

    if (role === null) {
        return <div>Loading...</div>; 
    }
    
    return (
        <div className="flex h-screen" data-theme="dark"> 

            <div className="sidebar bg-gray-800 text-white hidden lg:flex flex-col w-64 p-4 space-y-2">
                <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
                <button className="btn w-full text-left" onClick={() => navigate("/admin")}>
                Statistiques globales
                </button>
                <button className="btn w-full text-left" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    Gestion des utilisateurs
                    <span className={`ml-auto transition-transform ${userMenuOpen ? 'rotate-90' : ''}`}>
                        ▼
                    </span>
                </button>
                {userMenuOpen && (
                    <ul className="pl-4 space-y-1">
                        <li>
                            <Link to="/admin/user/list" className="hover:bg-gray-700 p-2 block rounded">Liste des utilisateurs</Link>
                        </li>
                        <li>
                            <Link to="/admin/user/add" className="hover:bg-gray-700 p-2 block rounded">Ajouter un utilisateur</Link>
                        </li>
                    </ul>
                )}
               
                <button className="btn w-full text-left" onClick={() => setAdsMenuOpen(!adsMenuOpen)}>
                    Gestion des annonces
                    <span className={`ml-auto transition-transform ${adsMenuOpen ? 'rotate-90' : ''}`}>
                        ▼
                    </span>
                </button>
                {adsMenuOpen && (
                    <ul className="pl-4 space-y-1">
                        <li>
                            <Link to="/admin/ads/list" className="hover:bg-gray-700 p-2 block rounded">Liste des annonces</Link>
                        </li>
                        <li>
                            <Link to="/admin/ads/add" className="hover:bg-gray-700 p-2 block rounded">Ajouter une annonce</Link>
                        </li>
                    </ul>
                )}
            </div>
            
            <div className="flex-1 p-4">
                <div className="navbar bg-base-200 rounded-xl p-4 mb-4 shadow-md flex justify-between">
                    <div className="navbar-start lg:hidden">
                        <div className="dropdown">
                            <button 
                                tabIndex={0} 
                                role="button" 
                                className="btn btn-ghost"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h7"
                                    />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content bg-base-100 flex flex-col gap-4 rounded-box mt-3 w-64 p-2 shadow z-50"
                                >
                                    <li>
                                        <button className="w-full text-left" onClick={() => handleMenuClick("/admin")}>
                                            Statistiques Globales
                                        </button>
                                    </li>
                                    <li>
                                        <button className="w-full text-left" onClick={() => {
                                            setUserMenuOpen(!userMenuOpen);
                                            
                                        }}>
                                            Gestion des utilisateurs
                                            <span className={`ml-auto transition-transform ${userMenuOpen ? 'rotate-90' : ''}`}>
                                                ▼
                                            </span>
                                        </button>
                                        {userMenuOpen && (
                                            <ul className="pl-4 space-y-1">
                                                <li>
                                                    <Link 
                                                        to="/admin/user/list" 
                                                        className="hover:bg-gray-700 p-2 block rounded"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        Liste des utilisateurs
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link 
                                                        to="/admin/user/addUser" 
                                                        className="hover:bg-gray-700 p-2 block rounded"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        Ajouter un utilisateur
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <button className="w-full text-left" onClick={() => {
                                            setAdsMenuOpen(!adsMenuOpen);
                                            
                                        }}>
                                            Gestion des annonces
                                            <span className={`ml-auto transition-transform ${adsMenuOpen ? 'rotate-90' : ''}`}>
                                                ▼
                                            </span>
                                        </button>
                                        {adsMenuOpen && (
                                            <ul className="pl-4 space-y-1">
                                                <li>
                                                    <Link 
                                                        to="/admin/ads/list" 
                                                        className="hover:bg-gray-700 p-2 block rounded"
                                                        onClick={() => setDropdownOpen(false)} 
                                                    >
                                                        Liste des annonces
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link 
                                                        to="/admin/ads/add" 
                                                        className="hover:bg-gray-700 p-2 block rounded"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        Ajouter une annonce
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link to="/" className="text-xl font-bold">Bien Immobilier</Link>
                    </div>
                </div>
                
                <div className="bg-base-200 h-[85%] overflow-y-auto p-6 rounded shadow-md">
                   {DashboardContent}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
