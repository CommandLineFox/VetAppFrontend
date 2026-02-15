import {Alert, Box, Button} from "@mui/material";
import {Loading} from "../../components/Loading/Loading.tsx";
import {SpeciesTable} from "../../features/Species/SpeciesTable.tsx";
import {useSpecies} from "../../hooks/useSpecies.ts";

const SpeciesPage = () => {
    const { data, loading, error, pagination, retry } = useSpecies();

    if (loading && data.length === 0) return <Loading message="Učitavanje..."/>;

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" action={
                    <Button color="inherit" size="small" onClick={retry}>Try again</Button>
                }>
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <SpeciesTable
            data={data}
            totalCount={pagination.totalElements}
            page={pagination.params.page}
            rowsPerPage={pagination.params.size}
            sortBy={pagination.params.sortBy}
            direction={pagination.params.direction}
            onPageChange={pagination.onPageChange}
            onRowsPerPageChange={pagination.onRowsPerPageChange}
            onSort={pagination.onSort}
        />
    );
};

export default SpeciesPage;