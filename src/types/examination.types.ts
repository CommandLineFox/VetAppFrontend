import {PatientDisplayDto} from "./patient.types";
import {VeterinarianDisplayDto} from "./veterinarian.types";

export interface Examination {
    id: number;
    date: string;
    anamnesis?: string;
    clinicalPresentation?: string;
    diagnosis?: string;
    treatment?: string;
    laboratoryAnalysis?: string;
    specialistExamination?: string;
    remarks?: string;
    patient: PatientDisplayDto;
    veterinarian: VeterinarianDisplayDto;
}

export interface ExaminationCreateDto {
    date: string;
    anamnesis: string;
    clinicalPresentation: string;
    diagnosis: string;
    treatment: string;
    laboratoryAnalysis?: string;
    specialistExamination?: string;
    remarks?: string;
    patientId: number;
    veterinarianId: number;
}

export interface ExaminationUpdateDto {
    date?: string;
    anamnesis?: string;
    clinicalPresentation?: string;
    diagnosis?: string;
    treatment?: string;
    laboratoryAnalysis?: string;
    specialistExamination?: string;
    remarks?: string;
    patientId?: number;
    veterinarianId?: number;
}

export interface ExaminationSearchDto {
    date?: string;
    dateFrom?: string;
    dateTo?: string;
    anamnesis?: string;
    clinicalPresentation?: string;
    diagnosis?: string;
    treatment?: string;
    laboratoryAnalysis?: string;
    specialistExamination?: string;
    remarks?: string;
    patientId?: number;
    veterinarianId?: number;
}