import {useMemo, useState} from "react";
import {appointmentService} from "../services/appointment.service";
import {Appointment, AppointmentSearchDto} from "../types/appointment.types";
import {useDataTable} from "./useDataTable";
import {useDebounce} from "./useDebounce";
import {usePagination} from "./usePagination";

export const useAppointments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const pagination = usePagination('date');

    const searchParams = useMemo(() => ({
        description: debouncedSearchTerm
    }), [debouncedSearchTerm]);

    const { data, loading, error, retry } = useDataTable<Appointment, AppointmentSearchDto>({
        fetchFn: appointmentService.findAll,
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