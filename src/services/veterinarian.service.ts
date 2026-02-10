import { apiClient } from "../api/client";
import { Veterinarian, VeterinarianCreateDto, VeterinarianUpdateDto } from "../types/veterinarian.types";

export const veterinarianService = {
    findAll: async (): Promise<Veterinarian[]> => {
        const response = await apiClient.get<Veterinarian[]>('/veterinarian');
        return response.data;
    },

    findById: async (id: number): Promise<Veterinarian> => {
        const response = await apiClient.get<Veterinarian>(`/veterinarian/${id}`);
        return response.data;
    },

    create: async (data: VeterinarianCreateDto): Promise<Veterinarian> => {
        const response = await apiClient.post<Veterinarian>('/veterinarian', data);
        return response.data;
    },

    update: async (id: number, data: VeterinarianUpdateDto): Promise<Veterinarian> => {
        const response = await apiClient.put<Veterinarian>(`/veterinarian/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/veterinarian/${id}`);
    }
};