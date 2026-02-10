export interface Species {
    id: number;
    name: string;
}

export interface SpeciesCreateDto {
    name: string;
}

export interface SpeciesUpdateDto {
    name?: string;
}