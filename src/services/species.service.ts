import {apiClient} from "../api/client";
import {API_ROUTES} from "../constants/apiRoutes.constants.ts";
import {PaginationParams, PageResponse} from "../types/api.types.ts";
import {Species, SpeciesCreateDto, SpeciesUpdateDto} from "../types/species.types";

export const speciesService = {
    findAll: async (params?: PaginationParams): Promise<Species[] | PageResponse<Species>> => {
        const response = await apiClient.get<Species[] | PageResponse<Species>>(`${API_ROUTES.SPECIES}`, {
            params
        });

        return response.data;
    },

    findById: async (id: number): Promise<Species> => {
        const response = await apiClient.get<Species>(`${API_ROUTES.SPECIES}/${id}`);
        return response.data;
    },

    create: async (data: SpeciesCreateDto): Promise<Species> => {
        const response = await apiClient.post<Species>(`${API_ROUTES.SPECIES}`, data);
        return response.data;
    },

    update: async (id: number, data: SpeciesUpdateDto): Promise<Species> => {
        const response = await apiClient.put<Species>(`${API_ROUTES.SPECIES}/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_ROUTES.SPECIES}/${id}`);
    }
};