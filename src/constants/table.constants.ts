// constants/table.constants.ts
import {Column} from "../types/table.types";
import {Patient} from "../types/patient.types";
import {Species} from "../types/species.types";
import {Veterinarian} from "../types/veterinarian.types";
import {Appointment} from "../types/appointment.types";
import {Breed} from "../types/breed.types";
import {Examination} from "../types/examination.types";
import {Owner} from "../types/owner.types";

export const PATIENT_COLUMNS: Column<Patient>[] = [
    { id: 'name', label: 'Pet Name' },
    { id: 'birthDate', label: 'Date of Birth' },
    { id: 'gender', label: 'Gender' },
    { id: 'passportNumber', label: 'Passport No.' },
    { id: 'microchipNumber', label: 'Microchip No.' },
    { id: 'cartonNumber', label: 'Record No.' },
    {
        id: 'owner',
        label: 'Owner',
        render: (p) => `${p.owner.firstName} ${p.owner.lastName}`
    },
    {
        id: 'breed',
        label: 'Breed',
        render: (p) => p.breed.name
    }
];

export const OWNER_COLUMNS: Column<Owner>[] = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'jmbg', label: 'National ID (JMBG)' },
    { id: 'address', label: 'Address' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'email', label: 'Email Address' }
];

export const APPOINTMENT_COLUMNS: Column<Appointment>[] = [
    { id: 'date', label: 'Date & Time' },
    { id: 'description', label: 'Reason/Description' },
    {
        id: 'patient',
        label: 'Patient',
        render: (a) => a.patient.name
    },
    {
        id: 'veterinarian',
        label: 'Veterinarian',
        render: (a) => `Dr. ${a.veterinarian.lastName}`
    }
];

export const EXAMINATION_COLUMNS: Column<Examination>[] = [
    { id: 'date', label: 'Examination Date' },
    { id: 'diagnosis', label: 'Diagnosis' },
    {
        id: 'patient',
        label: 'Patient',
        render: (e) => e.patient.name
    },
    {
        id: 'veterinarian',
        label: 'Attending Vet',
        render: (e) => `Dr. ${e.veterinarian.lastName}`
    },
    { id: 'treatment', label: 'Prescribed Treatment' }
];

export const VETERINARIAN_COLUMNS: Column<Veterinarian>[] = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'licenseNumber', label: 'License No.' },
    { id: 'email', label: 'Work Email' },
    { id: 'permissions', label: 'Access Level', align: 'center' }
];

export const BREED_COLUMNS: Column<Breed>[] = [
    { id: 'name', label: 'Breed Name' },
    {
        id: 'species',
        label: 'Species',
        render: (b) => b.species.name
    }
];

export const SPECIES_COLUMNS: Column<Species>[] = [
    { id: 'name', label: 'Species Name' }
];