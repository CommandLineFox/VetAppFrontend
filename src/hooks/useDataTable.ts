import {useState, useCallback, useEffect} from 'react';
import {PageResponse} from '../types/api.types';
import {cleanParams} from '../utils/api.utils';

interface UseDataTableProps<T, S> {
    fetchFn: (params: any) => Promise<T[] | PageResponse<T>>;
    searchParams?: S;
    pagination?: any;
}

export const useDataTable = <T, S>({ fetchFn, searchParams, pagination }: UseDataTableProps<T, S>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const rawParams = {
                ...(pagination?.pageableParams || {}),
                ...(searchParams || {})
            };

            const params = cleanParams(rawParams);

            const response = await fetchFn(params);

            if (response && typeof response === 'object' && 'content' in response) {
                setData(response.content);
                pagination?.setTotalElements(response.totalElements);
            } else {
                setData(Array.isArray(response) ? response : []);
                pagination?.setTotalElements(Array.isArray(response) ? response.length : 0);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Error fetching data.");
        } finally {
            setLoading(false);
        }
    }, [fetchFn, pagination?.pageableParams, searchParams]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, retry: fetchData };
};