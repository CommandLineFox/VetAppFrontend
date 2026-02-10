import { apiClient } from "../api/client";
import { Examination, ExaminationCreateDto, ExaminationUpdateDto } from "../types/examination.types";

export const examinationService = {
    findAll: async (): Promise<Examination[]> => {
        const response = await apiClient.get<Examination[]>('/examination');
        return response.data;
    },

    findById: async (id: number): Promise<Examination> => {
        const response = await apiClient.get<Examination>(`/examination/${id}`);
        return response.data;
    },

    create: async (data: ExaminationCreateDto): Promise<Examination> => {
        const response = await apiClient.post<Examination>('/examination', data);
        return response.data;
    },

    update: async (id: number, data: ExaminationUpdateDto): Promise<Examination> => {
        const response = await apiClient.put<Examination>(`/examination/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/examination/${id}`);
    }
};