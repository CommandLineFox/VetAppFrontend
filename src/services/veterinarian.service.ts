import {apiClient} from "../api/client";
import {API_ROUTES} from "../constants/apiRoutes.constants.ts";
import {PaginationParams, PageResponse} from "../types/api.types.ts";
import {Veterinarian, VeterinarianCreateDto, VeterinarianUpdateDto} from "../types/veterinarian.types";

export const veterinarianService = {
    findAll: async (params?: PaginationParams): Promise<Veterinarian[] | PageResponse<Veterinarian>> => {
        const response = await apiClient.get<Veterinarian[] | PageResponse<Veterinarian>>(`${API_ROUTES.VETERINARIAN}`, {
            params
        });

        return response.data;
    },

    findById: async (id: number): Promise<Veterinarian> => {
        const response = await apiClient.get<Veterinarian>(`${API_ROUTES.VETERINARIAN}/${id}`);
        return response.data;
    },

    create: async (data: VeterinarianCreateDto): Promise<Veterinarian> => {
        const response = await apiClient.post<Veterinarian>(`${API_ROUTES.VETERINARIAN}`, data);
        return response.data;
    },

    update: async (id: number, data: VeterinarianUpdateDto): Promise<Veterinarian> => {
        const response = await apiClient.put<Veterinarian>(`${API_ROUTES.VETERINARIAN}/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_ROUTES.VETERINARIAN}/${id}`);
    }
};