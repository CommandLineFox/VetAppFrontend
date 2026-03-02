import {apiClient} from "../api/client";
import {API_ROUTES} from "../constants/apiRoutes.constants.ts";
import {PaginationParams, PageResponse} from "../types/api.types.ts";
import {Patient, PatientCreateDto, PatientUpdateDto} from "../types/patient.types";

export const patientService = {
    findAll: async (params?: PaginationParams): Promise<Patient[] | PageResponse<Patient>> => {
        const response = await apiClient.get<Patient[] | PageResponse<Patient>>(`${API_ROUTES.PATIENT}`, {
            params
        });

        return response.data;
    },

    findById: async (id: number): Promise<Patient> => {
        const response = await apiClient.get<Patient>(`${API_ROUTES.PATIENT}/${id}`);
        return response.data;
    },

    create: async (data: PatientCreateDto): Promise<Patient> => {
        const response = await apiClient.post<Patient>(`${API_ROUTES.PATIENT}`, data);
        return response.data;
    },

    update: async (id: number, data: PatientUpdateDto): Promise<Patient> => {
        const response = await apiClient.put<Patient>(`${API_ROUTES.PATIENT}/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_ROUTES.PATIENT}/${id}`);
    }
};