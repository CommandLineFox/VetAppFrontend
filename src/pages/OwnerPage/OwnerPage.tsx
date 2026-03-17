import {useOwners} from "../../hooks/useOwners";
import {OwnerTable} from "../../features/Owner/OwnerTable";

const OwnerPage = () => {
    const { data, pagination, retry, searchTerm, setSearchTerm } = useOwners();

    return (
        <OwnerTable
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

export default OwnerPage;