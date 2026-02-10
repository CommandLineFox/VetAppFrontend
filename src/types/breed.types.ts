import {Species} from "./species.types";

export interface Breed {
    id: number;
    name: string;
    species: Species;
}

export interface BreedCreateDto {
    name: string;
    speciesId: number;
}

export interface BreedUpdateDto {
    name?: string;
    speciesId?: number;
}