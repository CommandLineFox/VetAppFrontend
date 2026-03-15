import {useMemo} from "react";
import {breedService} from "../services/breed.service.ts";
import {Breed, BreedSearchDto} from "../types/breed.types.ts";
import {useDataTable} from "./useDataTable.ts";

export const useBreedsOptions = (speciesId?: number) => {
    const searchParams = useMemo(() => {
        return speciesId ? { speciesId } : {};
    }, [speciesId]);

    const { data, loading } = useDataTable<Breed, BreedSearchDto>({
        fetchFn: breedService.findAll,
        searchParams: searchParams
    });

    return { options: data, loading };
};