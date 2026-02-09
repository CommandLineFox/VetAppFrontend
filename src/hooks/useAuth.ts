import {AxiosError} from "axios";
import {useState} from 'react';
import {useAuthContext} from "../context/AuthContext";
import {authService} from '../services/authService';
import {AuthorizationGoogleRequest, AuthorizationRequest} from "../types/auth.types";
import {ErrorResponse} from "../types/error.types";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { saveAuth } = useAuthContext();

    function login(credentials: AuthorizationRequest): Promise<boolean>;
    function login(googleToken: AuthorizationGoogleRequest): Promise<boolean>;
    async function login(data: AuthorizationRequest | AuthorizationGoogleRequest): Promise<boolean> {
        setLoading(true);
        setError(null);

        try {
            let response;

            if ('licenseNumber' in data) {
                response = await authService.login(data);
            } else {
                response = await authService.loginWithGoogle(data);
            }

            saveAuth(response.token);
            return true;
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            setError(axiosError.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { login, loading, error };
};