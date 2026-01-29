import {apiClient} from '../api/client';
import {AuthorizationGoogleRequest, AuthorizationRequest, AuthorizationResponse} from "../types/auth.types";

export const authService = {
    login: async (data: AuthorizationRequest): Promise<AuthorizationResponse> => {
        const response = await apiClient.post<AuthorizationResponse>('/auth/login', data);
        return response.data;
    },

    loginWithGoogle: async (data: AuthorizationGoogleRequest): Promise<AuthorizationResponse> => {
        const response = await apiClient.post<AuthorizationResponse>("/auth/google", data);
        return response.data;
    }
};