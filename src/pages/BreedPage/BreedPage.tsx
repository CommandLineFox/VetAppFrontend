import {useBreeds} from "../../hooks/useBreeds";
import {BreedTable} from "../../features/Breed/BreedTable";

const BreedPage = () => {
    const { data, loading, pagination, retry, searchTerm, setSearchTerm } = useBreeds();

    return (
        <BreedTable
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

export default BreedPage;