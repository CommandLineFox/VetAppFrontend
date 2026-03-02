import {useState, useCallback, useMemo} from 'react';
import {PaginationParams} from '../types/api.types';

export const usePagination = (initialSortBy: string = 'id') => {
    const [params, setParams] = useState<Required<Omit<PaginationParams, 'sort'>> & { sortBy: string, direction: 'asc' | 'desc' }>({
        page: 0,
        size: 10,
        sortBy: initialSortBy,
        direction: 'asc'
    });

    const [totalElements, setTotalElements] = useState(0);

    const pageableParams = useMemo(() => ({
        page: params.page,
        size: params.size,
        sort: `${params.sortBy},${params.direction}`
    }), [params.page, params.size, params.sortBy, params.direction]);

    const onPageChange = useCallback((_: unknown, newPage: number) => {
        setParams(prev => ({ ...prev, page: newPage }));
    }, []);

    const onRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setParams(prev => ({
            ...prev,
            size: parseInt(event.target.value, 10),
            page: 0
        }));
    }, []);

    const onSort = useCallback((property: string) => {
        setParams(prev => {
            const isAsc = prev.sortBy === property && prev.direction === 'asc';
            return {
                ...prev,
                sortBy: property,
                direction: isAsc ? 'desc' : 'asc',
                page: 0
            };
        });
    }, []);

    return { params, pageableParams, totalElements, setTotalElements, onPageChange, onRowsPerPageChange, onSort };
};