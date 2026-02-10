import {Breed} from "./breed.types";
import {Owner} from "./owner.types";

export interface Patient {
    id: number;
    name: string;
    birthDate: string;
    gender: string;
    passportNumber: string;
    microchipNumber: string;
    cartonNumber: number;
    owner: Owner;
    breed: Breed;
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