import { apiClient } from "../api/client";
import { Breed, BreedCreateDto, BreedUpdateDto } from "../types/breed.types";

export const breedService = {
    findAll: async (): Promise<Breed[]> => {
        const response = await apiClient.get<Breed[]>('/breed');
        return response.data;
    },

    findById: async (id: number): Promise<Breed> => {
        const response = await apiClient.get<Breed>(`/breed/${id}`);
        return response.data;
    },

    create: async (data: BreedCreateDto): Promise<Breed> => {
        const response = await apiClient.post<Breed>('/breed', data);
        return response.data;
    },

    update: async (id: number, data: BreedUpdateDto): Promise<Breed> => {
        const response = await apiClient.put<Breed>(`/breed/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/breed/${id}`);
    }
};