import {apiClient} from "../api/client";
import {API_ROUTES} from "../constants/apiRoutes.constants.ts";
import {PaginationParams, PageResponse} from "../types/api.types.ts";
import {Breed, BreedCreateDto, BreedUpdateDto} from "../types/breed.types";

export const breedService = {
    findAll: async (params?: PaginationParams): Promise<Breed[] | PageResponse<Breed>> => {
        const response = await apiClient.get<Breed[] | PageResponse<Breed>>(`${API_ROUTES.BREED}`, {
            params
        });

        return response.data;
    },

    findById: async (id: number): Promise<Breed> => {
        const response = await apiClient.get<Breed>(`${API_ROUTES.BREED}/${id}`);
        return response.data;
    },

    create: async (data: BreedCreateDto): Promise<Breed> => {
        const response = await apiClient.post<Breed>(`${API_ROUTES.BREED}`, data);
        return response.data;
    },

    update: async (id: number, data: BreedUpdateDto): Promise<Breed> => {
        const response = await apiClient.put<Breed>(`${API_ROUTES.BREED}/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_ROUTES.BREED}/${id}`);
    }
};