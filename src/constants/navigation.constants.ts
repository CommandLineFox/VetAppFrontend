import {Permission} from "../types/permissions.types";

export interface NavItem {
    label: string;
    to: string;
    permission: Permission | null;
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Početna', to: '/home', permission: null },
    { label: 'Species', to: '/species', permission: Permission.SPECIES_LIST },
    { label: 'Breeds', to: '/breeds', permission: Permission.BREED_LIST },
    { label: 'Patients', to: '/patients', permission: Permission.PATIENT_LIST },
    { label: 'Owners', to: '/owners', permission: Permission.OWNER_LIST },
    { label: 'Appointments', to: '/appointments', permission: Permission.APPOINTMENT_LIST },
    { label: 'Examinations', to: '/examinations', permission: Permission.EXAMINATION_LIST },
    { label: 'Veterinarians', to: '/veterinarians', permission: Permission.VETERINARIAN_LIST },
];