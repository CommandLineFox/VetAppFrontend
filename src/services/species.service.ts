import { apiClient } from "../api/client";
import { Species, SpeciesCreateDto, SpeciesUpdateDto } from "../types/species.types";

export const speciesService = {
    findAll: async (): Promise<Species[]> => {
        const response = await apiClient.get<Species[]>('/species');
        return response.data;
    },

    findById: async (id: number): Promise<Species> => {
        const response = await apiClient.get<Species>(`/species/${id}`);
        return response.data;
    },

    create: async (data: SpeciesCreateDto): Promise<Species> => {
        const response = await apiClient.post<Species>('/species', data);
        return response.data;
    },

    update: async (id: number, data: SpeciesUpdateDto): Promise<Species> => {
        const response = await apiClient.put<Species>(`/species/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/species/${id}`);
    }
};