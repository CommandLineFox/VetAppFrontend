export interface Owner {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber?: string;
    email?: string;
    jmbg: string;
}

export interface OwnerCreateDto {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber?: string;
    email?: string;
    jmbg: string;
}

export interface OwnerUpdateDto {
    firstName?: string;
    lastName?: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    jmbg?: string;
}