import {apiClient} from "../api/client";
import {API_ROUTES} from "../constants/apiRoutes.constants.ts";
import {PaginationParams, PageResponse} from "../types/api.types.ts";
import {Appointment, AppointmentCreateDto, AppointmentUpdateDto} from "../types/appointment.types";

export const appointmentService = {
    findAll: async (params?: PaginationParams): Promise<Appointment[] | PageResponse<Appointment>> => {
        const response = await apiClient.get<Appointment[] | PageResponse<Appointment>>(API_ROUTES.APPOINTMENT, {
            params
        });

        return response.data;
    },

    findById: async (id: number): Promise<Appointment> => {
        const response = await apiClient.get<Appointment>(`${API_ROUTES.APPOINTMENT}/${id}`);
        return response.data;
    },

    create: async (data: AppointmentCreateDto): Promise<Appointment> => {
        const response = await apiClient.post<Appointment>(`${API_ROUTES.APPOINTMENT}`, data);
        return response.data;
    },

    update: async (id: number, data: AppointmentUpdateDto): Promise<Appointment> => {
        const response = await apiClient.put<Appointment>(`${API_ROUTES.APPOINTMENT}/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`${API_ROUTES.APPOINTMENT}/${id}`);
    }
};