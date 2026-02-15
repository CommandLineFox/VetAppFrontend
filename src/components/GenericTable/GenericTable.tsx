import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TablePagination,
    Box,
    Typography,
    Button,
    TextField,
    TableSortLabel
} from '@mui/material';
import {Permission} from "../../constants/permissions.constants";
import {Column} from "../../types/table.types";
import {StyledTableContainer, StyledTableHead, StyledTableRow, StyledHeaderCell, TableToolbar, ActionsWrapper} from './GenericTable.styles';
import {HasPermission} from "../Auth/HasPermission";

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
    direction?: 'asc' | 'desc';
    onSort?: (property: string) => void;
}

export const GenericTable = <T extends { id?: string | number }>({
                                                                     title, data, columns, searchTerm, onSearchChange, onCreate,
                                                                     createPermission, onEdit, onDelete, editPermission, deletePermission,
                                                                     page = 0, rowsPerPage = 10, totalCount = 0, onPageChange,
                                                                     onRowsPerPageChange, onAdvancedFilter, sortBy, direction, onSort,
                                                                 }: GenericTableProps<T>) => {

    const showActions = onEdit || onDelete;

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
                            label="Pretraga"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    )}
                    {onAdvancedFilter && (
                        <Button variant="outlined" onClick={onAdvancedFilter}>Filteri</Button>
                    )}
                    {onCreate && createPermission && (
                        <HasPermission requiredPermission={createPermission}>
                            <Button variant="contained" onClick={onCreate}>Dodaj novo</Button>
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
                                    minwidth={column.minWidth}
                                    sortDirection={sortBy === column.id ? direction : false}
                                >
                                    {onSort ? (
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            direction={sortBy === column.id ? direction : 'asc'}
                                            onClick={() => onSort(column.id.toString())}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </StyledHeaderCell>
                            ))}
                            {showActions && <TableCell align="center">Actions</TableCell>}
                        </StyledTableRow>
                    </StyledTableHead>

                    <TableBody>
                        {data.length === 0 ? (
                            <StyledTableRow>
                                <TableCell colSpan={columns.length + (showActions ? 1 : 0)} align="center">
                                    <Typography variant="body1" color="text.secondary">
                                        No data found.
                                    </Typography>
                                </TableCell>
                            </StyledTableRow>
                        ) : (
                            data.map((row, index) => (
                                <StyledTableRow key={row.id || index}>
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
                                                            onClick={() => onEdit(row)}
                                                        >
                                                            Izmeni
                                                        </Button>
                                                    </HasPermission>
                                                )}

                                                {onDelete && deletePermission && (
                                                    <HasPermission requiredPermission={deletePermission}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            color="error"
                                                            onClick={() => onDelete(row)}
                                                        >
                                                            Obriši
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
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onPageChange!}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </StyledTableContainer>
        </Box>
    );
};