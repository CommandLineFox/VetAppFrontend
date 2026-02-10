import { apiClient } from "../api/client";
import { Patient, PatientCreateDto, PatientUpdateDto } from "../types/patient.types";

export const patientService = {
    findAll: async (): Promise<Patient[]> => {
        const response = await apiClient.get<Patient[]>('/patient');
        return response.data;
    },

    findById: async (id: number): Promise<Patient> => {
        const response = await apiClient.get<Patient>(`/patient/${id}`);
        return response.data;
    },

    create: async (data: PatientCreateDto): Promise<Patient> => {
        const response = await apiClient.post<Patient>('/patient', data);
        return response.data;
    },

    update: async (id: number, data: PatientUpdateDto): Promise<Patient> => {
        const response = await apiClient.put<Patient>(`/patient/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/patient/${id}`);
    }
};