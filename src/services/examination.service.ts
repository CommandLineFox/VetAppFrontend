import {apiClient} from "../api/client";
import {API_ROUTES} from "../constants/apiRoutes.constants.ts";
import {PaginationParams, PageResponse} from "../types/api.types.ts";
import {Examination, ExaminationCreateDto, ExaminationUpdateDto} from "../types/examination.types";

export const examinationService = {
    findAll: async (params?: PaginationParams): Promise<Examination[] | PageResponse<Examination>> => {
        const response = await apiClient.get<Examination[] | PageResponse<Examination>>(`${API_ROUTES.EXAMINATION}`, {
            params
        });

        return response.data;
    },

    findById: async (id: number): Promise<Examination> => {
        const response = await apiClient.get<Examination>(`${API_ROUTES.EXAMINATION}/${id}`);
        return response.data;
    },

    create: async (data: ExaminationCreateDto): Promise<Examination> => {
        const response = await apiClient.post<Examination>(`${API_ROUTES.EXAMINATION}`, data);
        return response.data;
    },

    update: async (id: number, data: ExaminationUpdateDto): Promise<Examination> => {
        const response = await apiClient.put<Examination>(`${API_ROUTES.EXAMINATION}/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_ROUTES.EXAMINATION}/${id}`);
    }
};