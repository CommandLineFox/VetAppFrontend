import {useMemo, useState} from "react";
import {veterinarianService} from "../services/veterinarian.service";
import {Veterinarian, VeterinarianSearchDto} from "../types/veterinarian.types";
import {useDataTable} from "./useDataTable";
import {useDebounce} from "./useDebounce";
import {usePagination} from "./usePagination";

export const useVeterinarians = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const pagination = usePagination('lastName');

    const searchParams = useMemo(() => ({
        lastName: debouncedSearchTerm
    }), [debouncedSearchTerm]);

    const { data, loading, error, retry } = useDataTable<Veterinarian, VeterinarianSearchDto>({
        fetchFn: veterinarianService.findAll,
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