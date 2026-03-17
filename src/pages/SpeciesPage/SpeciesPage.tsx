import {useSpecies} from "../../hooks/useSpecies";
import {SpeciesTable} from "../../features/Species/SpeciesTable";

const SpeciesPage = () => {
    const { data, pagination, retry, searchTerm, setSearchTerm } = useSpecies();

    return (
        <SpeciesTable
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

export default SpeciesPage;