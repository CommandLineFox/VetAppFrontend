import {useMemo, useState} from "react";
import {examinationService} from "../services/examination.service";
import {Examination, ExaminationSearchDto} from "../types/examination.types";
import {useDataTable} from "./useDataTable";
import {useDebounce} from "./useDebounce";
import {usePagination} from "./usePagination";

export const useExaminations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const pagination = usePagination('date');

    const searchParams = useMemo(() => ({
        diagnosis: debouncedSearchTerm
    }), [debouncedSearchTerm]);

    const { data, loading, error, retry } = useDataTable<Examination, ExaminationSearchDto>({
        fetchFn: examinationService.findAll,
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