import {jwtDecode} from "jwt-decode";
import {AuthState, DecodedToken} from "../types/context.types";

export const tokenToState = (token: string): AuthState => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);

        if (decoded.exp < Date.now() / 1000) {
            return emptyAuthState();
        }

        return {
            token,
            permissions: decoded.permissions || [],
            licenseNumber: decoded.sub,
            isAuthenticated: true
        };
    } catch (error) {
        return emptyAuthState();
    }
};

export const getInitialAuthState = (): AuthState => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) return emptyAuthState();

    const state = tokenToState(savedToken);

    if (!state.isAuthenticated) {
        localStorage.removeItem('token');
    }

    return state;
};

export const emptyAuthState = (): AuthState => ({
    token: null,
    permissions: [],
    licenseNumber: null,
    isAuthenticated: false
});