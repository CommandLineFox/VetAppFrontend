import {apiClient} from '../api/client';
import {AuthorizationRequest, AuthorizationResponse} from "../types/auth.types";

export const authService = {
    login: async (data: AuthorizationRequest): Promise<AuthorizationResponse> => {
        const response = await apiClient.post<AuthorizationResponse>('/auth/login', data);
        return response.data;
    }
};