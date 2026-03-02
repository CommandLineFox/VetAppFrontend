import {apiClient} from "../api/client";
import {API_ROUTES} from "../constants/apiRoutes.constants.ts";
import {PaginationParams, PageResponse} from "../types/api.types.ts";
import {Owner, OwnerCreateDto, OwnerUpdateDto} from "../types/owner.types";

export const ownerService = {
    findAll: async (params?: PaginationParams): Promise<Owner[] | PageResponse<Owner>> => {
        const response = await apiClient.get<Owner[] | PageResponse<Owner>>(`${API_ROUTES.OWNER}`, {
            params
        });

        return response.data;
    },

    findById: async (id: number): Promise<Owner> => {
        const response = await apiClient.get<Owner>(`${API_ROUTES.OWNER}/${id}`);
        return response.data;
    },

    create: async (data: OwnerCreateDto): Promise<Owner> => {
        const response = await apiClient.post<Owner>(`${API_ROUTES.OWNER}`, data);
        return response.data;
    },

    update: async (id: number, data: OwnerUpdateDto): Promise<Owner> => {
        const response = await apiClient.put<Owner>(`${API_ROUTES.OWNER}/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_ROUTES.OWNER}/${id}`);
    }
};