import {SpeciesDisplayDto} from "./species.types";

export interface Breed {
    id: number;
    name: string;
    species: SpeciesDisplayDto;
}

export interface BreedCreateDto {
    name: string;
    speciesId: number;
}

export interface BreedUpdateDto {
    name?: string;
    speciesId?: number;
}

export interface BreedSearchDto {
    name?: string;
    speciesId?: number;
}

export interface BreedDisplayDto {
    id: number;
    name: string;
}