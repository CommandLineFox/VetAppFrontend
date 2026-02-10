export interface Veterinarian {
    id: number;
    firstName: string;
    lastName: string;
    licenseNumber: number;
    email: string;
    permissions: number;
}

export interface VeterinarianCreateDto {
    firstName: string;
    lastName: string;
    licenseNumber: number;
    email: string;
    password: string;
    permissions: number;
}

export interface VeterinarianUpdateDto {
    firstName?: string;
    lastName?: string;
    licenseNumber?: number;
    email?: string;
    password?: string;
    permissions?: number;
}