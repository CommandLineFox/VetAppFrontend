import {usePatients} from "../../hooks/usePatients";
import {PatientTable} from "../../features/Patient/PatientTable";

const PatientPage = () => {
    const { data, pagination, retry, searchTerm, setSearchTerm } = usePatients();

    return (
        <PatientTable
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

export default PatientPage;