import {useVeterinarians} from "../../hooks/useVeterinarians";
import {VeterinarianTable} from "../../features/Veterinarian/VeterinarianTable";

const VeterinarianPage = () => {
    const { data, pagination, retry, searchTerm, setSearchTerm } = useVeterinarians();

    return (
        <VeterinarianTable
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

export default VeterinarianPage;