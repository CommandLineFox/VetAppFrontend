import {patientService} from "../services/patient.service";
import {Patient, PatientSearchDto} from "../types/patient.types";
import {useDataTable} from "./useDataTable";

export const usePatientOptions = (ownerId?: number) => {
    const searchParams = ownerId ? { ownerId } : {};

    const { data, loading } = useDataTable<Patient, PatientSearchDto>({
        fetchFn: patientService.findAll,
        searchParams: searchParams
    });

    return { options: data, loading };
};