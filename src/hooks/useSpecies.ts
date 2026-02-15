import {useCallback, useEffect, useState} from "react";
import {speciesService} from "../services/species.service.ts";
import {Species} from "../types/species.types.ts";
import {usePagination} from "./usePagination.ts";

export const useSpecies = () => {
    const [data, setData] = useState<Species[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const pagination = usePagination('name');

    const fetchSpecies = useCallback(async () => {
        setLoading(true);
        try {
            const response = await speciesService.findAll(pagination.params);

            if ('content' in response) {
                setData(response.content);
                pagination.setTotalElements(response.totalElements);
            } else {
                setData(response);
                pagination.setTotalElements(response.length);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Error...");
        } finally {
            setLoading(false);
        }
    }, [pagination.params]);

    useEffect(() => {
        fetchSpecies();
    }, [fetchSpecies]);

    return { data, loading, error, searchTerm, setSearchTerm, pagination, retry: fetchSpecies };
};