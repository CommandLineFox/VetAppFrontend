import {BreedDisplayDto} from "./breed.types";
import {OwnerDisplayDto} from "./owner.types";

export interface Patient {
    id: number;
    name: string;
    birthDate: string;
    gender: string;
    passportNumber: string;
    microchipNumber: string;
    cartonNumber: number;
    owner: OwnerDisplayDto;
    breed: BreedDisplayDto;
}

export interface PatientCreateDto {
    name: string;
    birthDate: string;
    gender: string;
    passportNumber: string;
    microchipNumber: string;
    cartonNumber: number;
    ownerId: number;
    breedId: number;
}

export interface PatientUpdateDto {
    name?: string;
    birthDate?: string;
    gender?: string;
    passportNumber?: string;
    microchipNumber?: string;
    cartonNumber?: number;
    ownerId?: number;
    breedId?: number;
}

export interface PatientSearchDto {
    name?: string;
    birthDate?: string;
    birthDateFrom?: string;
    birthDateTo?: string;
    gender?: string;
    passportNumber?: string;
    microchipNumber?: string;
    ownerId?: number;
}

export interface PatientDisplayDto {
    id: number;
    name: string;
}