import {useMemo, useState} from "react";
import {breedService} from "../services/breed.service.ts";
import {Breed, BreedSearchDto} from "../types/breed.types.ts";
import {useDataTable} from "./useDataTable.ts";
import {useDebounce} from "./useDebounce.ts";
import {usePagination} from "./usePagination.ts";

export const useBreeds = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const pagination = usePagination('name');

    const searchParams = useMemo(() => ({
        name: debouncedSearchTerm
    }), [debouncedSearchTerm]);

    const { data, loading, error, retry } = useDataTable<Breed, BreedSearchDto>({
        fetchFn: breedService.findAll,
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