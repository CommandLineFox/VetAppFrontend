import {useMemo} from "react";
import {speciesService} from "../services/species.service.ts";
import {Species, SpeciesSearchDto} from "../types/species.types.ts";
import {useDataTable} from "./useDataTable.ts";

export const useSpeciesOptions = (nameFilter?: string) => {
    const searchParams = useMemo(() =>
            nameFilter ? { name: nameFilter } : {},
        [nameFilter]);

    const { data, loading } = useDataTable<Species, SpeciesSearchDto>({
        fetchFn: speciesService.findAll,
        searchParams: searchParams
    });

    return { options: data, loading };
};