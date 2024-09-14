import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

    useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken);
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem('authToken');
            setIsLoggedIn(false);
        }
    }, [authToken]);

    const value = {
        authToken, 
        setAuthToken,
        isLoggedIn,
        setIsLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
