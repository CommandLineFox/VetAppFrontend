import {useMemo, useState} from "react";
import {ownerService} from "../services/owner.service";
import {Owner, OwnerSearchDto} from "../types/owner.types";
import {useDataTable} from "./useDataTable";
import {useDebounce} from "./useDebounce";
import {usePagination} from "./usePagination";

export const useOwners = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const pagination = usePagination('lastName');

    const searchParams = useMemo(() => ({
        lastName: debouncedSearchTerm
    }), [debouncedSearchTerm]);

    const { data, loading, error, retry } = useDataTable<Owner, OwnerSearchDto>({
        fetchFn: ownerService.findAll,
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