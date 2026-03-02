import {useMemo, useState} from "react";
import {speciesService} from "../services/species.service.ts";
import {Species, SpeciesSearchDto} from "../types/species.types.ts";
import {useDataTable} from "./useDataTable.ts";
import {useDebounce} from "./useDebounce.ts";
import {usePagination} from "./usePagination.ts";

export const useSpecies = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const pagination = usePagination('name');

    const searchParams = useMemo(() => ({
        name: debouncedSearchTerm
    }), [debouncedSearchTerm]);

    const { data, loading, error, retry } = useDataTable<Species, SpeciesSearchDto>({
        fetchFn: speciesService.findAll,
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