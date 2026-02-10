import {apiClient} from "../api/client";
import {Appointment, AppointmentCreateDto, AppointmentUpdateDto} from "../types/appointment.types";

export const appointmentService = {
    findAll: async (): Promise<Appointment[]> => {
        const response = await apiClient.get<Appointment[]>('/appointment');
        return response.data;
    },

    findById: async (id: number): Promise<Appointment> => {
        const response = await apiClient.get<Appointment>(`/appointment/${id}`);
        return response.data;
    },

    create: async (data: AppointmentCreateDto): Promise<Appointment> => {
        const response = await apiClient.post<Appointment>('/appointment', data);
        return response.data;
    },

    update: async (id: number, data: AppointmentUpdateDto): Promise<Appointment> => {
        const response = await apiClient.put<Appointment>(`/appointment/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/appointment/${id}`);
    }
};