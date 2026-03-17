import {PatientDisplayDto} from "./patient.types";
import {VeterinarianDisplayDto} from "./veterinarian.types";

export interface Appointment {
    id: number;
    date: string;
    description: string;
    veterinarian: VeterinarianDisplayDto;
    patient: PatientDisplayDto;
}

export interface AppointmentCreateDto {
    date: string;
    description: string;
    veterinarianId: number;
    patientId: number;
}

export interface AppointmentUpdateDto {
    date?: string;
    description?: string;
    veterinarianId?: number;
    patientId?: number;
}

export interface AppointmentSearchDto {
    date?: string;
    dateFrom?: string;
    dateTo?: string;
    description?: string;
    veterinarianId?: number;
    patientId?: number;
}