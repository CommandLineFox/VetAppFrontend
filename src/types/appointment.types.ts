import {Patient} from "./patient.types";
import {Veterinarian} from "./veterinarian.types";

export interface Appointment {
    id: number;
    date: string;
    description: string;
    veterinarian: Veterinarian;
    patient: Patient;
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