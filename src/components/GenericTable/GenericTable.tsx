import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TablePagination,
    Box,
    Typography,
    TextField,
    TableSortLabel
} from '@mui/material';
import {Permission} from "../../constants/permissions.constants";
import {Column} from "../../types/table.types";
import {
    StyledTableContainer,
    StyledTableHead,
    StyledTableRow,
    StyledHeaderCell,
    TableToolbar,
    ActionsWrapper
} from './GenericTable.styles';
import {HasPermission} from "../Auth/HasPermission";
import {Button} from "../Button/Button";

interface GenericTableProps<T> {
    title?: string;
    data: T[];
    columns: Column<T>[];
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
    onCreate?: () => void;
    createPermission?: Permission;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    editPermission?: Permission;
    deletePermission?: Permission;
    page?: number;
    rowsPerPage?: number;
    totalCount?: number;
    onPageChange?: (event: unknown, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAdvancedFilter?: () => void;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    onSort?: (property: string) => void;
    onRowClick?: (item: T) => void;
}

export const GenericTable = <T extends { id?: string | number }>({
                                                                     title,
                                                                     data,
                                                                     columns,
                                                                     searchTerm,
                                                                     onSearchChange,
                                                                     onCreate,
                                                                     createPermission,
                                                                     onEdit,
                                                                     onDelete,
                                                                     editPermission,
                                                                     deletePermission,
                                                                     page = 0,
                                                                     rowsPerPage = 10,
                                                                     totalCount = 0,
                                                                     onPageChange,
                                                                     onRowsPerPageChange,
                                                                     onAdvancedFilter,
                                                                     sortBy,
                                                                     sortDirection = 'asc',
                                                                     onSort,
                                                                     onRowClick,
                                                                 }: GenericTableProps<T>) => {

    const showActions = onEdit || onDelete;

    const handleSort = (property: string) => {
        if (onSort) {
            onSort(property);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TableToolbar>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {onSearchChange && (
                        <TextField
                            size="small"
                            label="Search"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            inputProps={{ 'data-cy': 'table-search-input' }}
                        />
                    )}
                    {onAdvancedFilter && (
                        <Button variant="outlined" onClick={onAdvancedFilter} data-cy="table-filter-btn">
                            Filters
                        </Button>
                    )}
                    {onCreate && createPermission && (
                        <HasPermission requiredPermission={createPermission}>
                            <Button
                                variant="contained"
                                onClick={onCreate}
                                data-cy="table-create-btn"
                            >
                                Add new
                            </Button>
                        </HasPermission>
                    )}
                </Box>
            </TableToolbar>

            <StyledTableContainer>
                <Table stickyHeader>
                    <StyledTableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledHeaderCell
                                    key={column.id.toString()}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={sortBy === column.id ? sortDirection : false}
                                >
                                    {onSort ? (
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            direction={sortBy === column.id ? sortDirection : 'asc'}
                                            onClick={() => handleSort(column.id.toString())}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </StyledHeaderCell>
                            ))}
                            {showActions && (
                                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                    Actions
                                </TableCell>
                            )}
                        </StyledTableRow>
                    </StyledTableHead>

                    <TableBody>
                        {data.length === 0 ? (
                            <StyledTableRow data-cy="table-no-data">
                                <TableCell colSpan={columns.length + (showActions ? 1 : 0)} align="center">
                                    <Typography variant="body1" color="text.secondary" sx={{ py: 3 }}>
                                        No data found.
                                    </Typography>
                                </TableCell>
                            </StyledTableRow>
                        ) : (
                            data.map((row, index) => (
                                <StyledTableRow
                                    key={row.id || index}
                                    sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                    onClick={() => onRowClick?.(row)}
                                    data-cy={`table-row-${index}`}
                                >
                                    {columns.map((column) => (
                                        <TableCell key={column.id.toString()} align={column.align}>
                                            {column.render
                                                ? column.render(row)
                                                : (row as any)[column.id]}
                                        </TableCell>
                                    ))}

                                    {showActions && (
                                        <TableCell align="center">
                                            <ActionsWrapper>
                                                {onEdit && editPermission && (
                                                    <HasPermission requiredPermission={editPermission}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onEdit(row);
                                                            }}
                                                            data-cy={`edit-btn-${row.id}`}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </HasPermission>
                                                )}

                                                {onDelete && deletePermission && (
                                                    <HasPermission requiredPermission={deletePermission}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            color="error"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onDelete(row);
                                                            }}
                                                            data-cy={`delete-btn-${row.id}`}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </HasPermission>
                                                )}
                                            </ActionsWrapper>
                                        </TableCell>
                                    )}
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onPageChange!}
                    onRowsPerPageChange={onRowsPerPageChange}
                    labelRowsPerPage="Redova po strani:"
                    data-cy="table-pagination"
                />
            </StyledTableContainer>
        </Box>
    );
};