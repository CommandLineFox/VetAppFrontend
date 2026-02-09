import React, {createContext, useContext, useState, useMemo, useCallback, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
import {useNavigate} from "react-router-dom";
import {AuthContextType} from "../types/context.types";
import {emptyAuthState, getInitialAuthState, tokenToState} from "../utils/authUtils";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState(getInitialAuthState);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setAuth(emptyAuthState());
        navigate('/login');
    }, [navigate]);

    const saveAuth = useCallback((token: string) => {
        localStorage.setItem('token', token);
        setAuth(tokenToState(token));
    }, []);

    useEffect(() => {
        if (!auth.token) {
            return;
        }

        const { exp } = jwtDecode<{ exp: number }>(auth.token);
        const remainingTime = exp * 1000 - Date.now();

        if (remainingTime <= 0) {
            logout();
            return;
        }

        const timer = setTimeout(logout, remainingTime);
        return () => clearTimeout(timer);
    }, [auth.token, logout]);

    useEffect(() => {
        const handleForceLogout = () => {
            logout();
        };

        window.addEventListener('force-logout', handleForceLogout);
        return () => window.removeEventListener('force-logout', handleForceLogout);
    }, [logout]);

    useEffect(() => {
        const syncLogout = (event: StorageEvent) => {
            if (event.key === 'token' && !event.newValue) {
                logout();
            }
        };

        window.addEventListener('storage', syncLogout);
        return () => window.removeEventListener('storage', syncLogout);
    }, [logout]);

    const value = useMemo(() => ({ ...auth, saveAuth, logout }), [auth, saveAuth, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
    return context;
};