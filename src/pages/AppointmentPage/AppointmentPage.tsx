import {useAppointments} from "../../hooks/useAppointments";
import {AppointmentTable} from "../../features/Appointment/AppointmentTable";

const AppointmentPage = () => {
    const { data, pagination, retry, searchTerm, setSearchTerm } = useAppointments();

    return (
        <AppointmentTable
            data={data}
            totalCount={pagination.totalElements}
            page={pagination.params.page}
            rowsPerPage={pagination.params.size}
            onPageChange={pagination.onPageChange}
            onRowsPerPageChange={pagination.onRowsPerPageChange}
            onSort={pagination.onSort}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onRefresh={retry}
            sortBy={pagination.params.sortBy}
            sortDirection={pagination.params.direction}
        />
    );
};

export default AppointmentPage;