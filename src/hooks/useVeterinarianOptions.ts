import {useMemo} from "react";
import {veterinarianService} from "../services/veterinarian.service";
import {Veterinarian, VeterinarianSearchDto} from "../types/veterinarian.types";
import {useDataTable} from "./useDataTable";

export const useVeterinarianOptions = () => {
    const searchParams = useMemo(() => {
        return {};
    }, []);

    const { data, loading } = useDataTable<Veterinarian, VeterinarianSearchDto>({
        fetchFn: veterinarianService.findAll,
        searchParams: searchParams
    });

    return { options: data, loading };
};