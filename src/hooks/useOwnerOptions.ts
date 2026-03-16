import {useMemo} from "react";
import {ownerService} from "../services/owner.service";
import {Owner, OwnerSearchDto} from "../types/owner.types";
import {useDataTable} from "./useDataTable";

export const useOwnerOptions = () => {
    const { data, loading } = useDataTable<Owner, OwnerSearchDto>({
        fetchFn: ownerService.findAll,
        searchParams: {}
    });

    return { options: data, loading };
};