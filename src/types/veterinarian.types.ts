export interface Veterinarian {
    id: number;
    firstName: string;
    lastName: string;
    licenseNumber: number;
    email: string;
    permissions: string[];
}

export interface VeterinarianCreateDto {
    firstName: string;
    lastName: string;
    licenseNumber: number;
    email: string;
    password: string;
    permissions: string[];
}

export interface VeterinarianUpdateDto {
    firstName?: string;
    lastName?: string;
    licenseNumber?: number;
    email?: string;
    password?: string;
    permissions?: string[];
}

export interface VeterinarianSearchDto {
    firstName?: string;
    lastName?: string;
    licenseNumber?: number;
}

export interface VeterinarianDisplayDto {
    id: number;
    firstName: string;
    lastName: string;
}