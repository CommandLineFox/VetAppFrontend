import {useMemo, useState} from "react";
import {patientService} from "../services/patient.service";
import {Patient, PatientSearchDto} from "../types/patient.types";
import {useDataTable} from "./useDataTable";
import {useDebounce} from "./useDebounce";
import {usePagination} from "./usePagination";

export const usePatients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const pagination = usePagination('name');

    const searchParams = useMemo(() => ({
        name: debouncedSearchTerm
    }), [debouncedSearchTerm]);

    const { data, loading, error, retry } = useDataTable<Patient, PatientSearchDto>({
        fetchFn: patientService.findAll,
        searchParams,
        pagination
    });

    return {
        data,
        loading,
        error,
        searchTerm,
        setSearchTerm: (val: string) => {
            setSearchTerm(val);
            pagination.onPageChange(null, 0);
        },
        pagination,
        retry
    };
};