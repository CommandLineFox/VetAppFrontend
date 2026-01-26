import {AxiosError} from "axios";
import {useState} from 'react';
import {authService} from '../services/authService';
import {AuthorizationRequest} from "../types/auth.types";
import {ErrorResponse} from "../types/error.types";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: AuthorizationRequest): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const data = await authService.login(credentials);
            localStorage.setItem('token', data.token);
            return true;
        } catch (err: unknown) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const backendMessage = axiosError.response?.data?.message || 'Error on server';
            setError(backendMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};