import {Patient} from "./patient.types";
import {Veterinarian} from "./veterinarian.types";

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
    patient: Patient;
    veterinarian: Veterinarian;
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