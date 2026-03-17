import {useExaminations} from "../../hooks/useExaminations";
import {ExaminationTable} from "../../features/Examination/ExaminationTable";

const ExaminationPage = () => {
    const { data, pagination, retry, searchTerm, setSearchTerm } = useExaminations();

    return (
        <ExaminationTable
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

export default ExaminationPage;