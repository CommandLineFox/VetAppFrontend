import {speciesService} from "../services/species.service.ts";
import {Species, SpeciesSearchDto} from "../types/species.types.ts";
import {useDataTable} from "./useDataTable.ts";

export const useSpeciesOptions = (nameFilter?: string) => {
    const { data, loading } = useDataTable<Species, SpeciesSearchDto>({
        fetchFn: speciesService.findAll,
        searchParams: nameFilter ? { name: nameFilter } : {}
    });

    return { options: data, loading };
};