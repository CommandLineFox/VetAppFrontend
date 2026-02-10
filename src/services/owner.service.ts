import { apiClient } from "../api/client";
import { Owner, OwnerCreateDto, OwnerUpdateDto } from "../types/owner.types";

export const ownerService = {
    findAll: async (): Promise<Owner[]> => {
        const response = await apiClient.get<Owner[]>('/owner');
        return response.data;
    },

    findById: async (id: number): Promise<Owner> => {
        const response = await apiClient.get<Owner>(`/owner/${id}`);
        return response.data;
    },

    create: async (data: OwnerCreateDto): Promise<Owner> => {
        const response = await apiClient.post<Owner>('/owner', data);
        return response.data;
    },

    update: async (id: number, data: OwnerUpdateDto): Promise<Owner> => {
        const response = await apiClient.put<Owner>(`/owner/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/owner/${id}`);
    }
};