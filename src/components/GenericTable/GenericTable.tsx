import React from 'react';
import {Table, TableBody, TableCell, TablePagination, Box, Typography, Button, TextField} from '@mui/material';
import {Permission} from "../../constants/permissions.constants";
import {Column} from "../../types/table.types";
import {StyledTableContainer, StyledTableHead, StyledTableRow, ActionsWrapper} from './GenericTable.styles';
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
                                                                     page,
                                                                     rowsPerPage,
                                                                     totalCount,
                                                                     onPageChange,
                                                                     onRowsPerPageChange,
                                                                     onAdvancedFilter,
                                                                 }: GenericTableProps<T>) => {

    const showActions = onEdit || onDelete;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                mb: 2,
                px: 1
            }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {onSearchChange && (
                        <TextField
                            size="small"
                            label="Search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            sx={{ minWidth: 200 }}
                        />
                    )}

                    {onAdvancedFilter && (
                        <Button
                            variant="outlined"
                            onClick={onAdvancedFilter}
                            sx={{ height: '40px' }}
                        >
                            Filters
                        </Button>
                    )}

                    {onCreate && createPermission && (
                        <HasPermission requiredPermission={createPermission}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onCreate}
                                sx={{ whiteSpace: 'nowrap', px: 3 }}
                            >
                                Add New
                            </Button>
                        </HasPermission>
                    )}
                </Box>
            </Box>

            <StyledTableContainer>
                <Table stickyHeader>
                    <StyledTableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id.toString()}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {showActions && <TableCell align="center">Actions</TableCell>}
                        </StyledTableRow>
                    </StyledTableHead>
                    <TableBody>
                        {data.length === 0 ? (
                            <StyledTableRow>
                                <TableCell
                                    colSpan={columns.length + (showActions ? 1 : 0)}
                                    align="center"
                                    sx={{ py: 3 }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        No data available.
                                    </Typography>
                                </TableCell>
                            </StyledTableRow>
                        ) : (
                            data.map((row, index) => (
                                <StyledTableRow key={row.id || index}>
                                    {columns.map((column) => {
                                        const value = (row as any)[column.id];
                                        return (
                                            <TableCell key={column.id.toString()} align={column.align}>
                                                {column.render
                                                    ? column.render(row)
                                                    : column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                            </TableCell>
                                        );
                                    })}

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
                                                            onClick={() => onDelete(row)}
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

                {onPageChange && rowsPerPage !== undefined && totalCount !== undefined && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page || 0}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                )}
            </StyledTableContainer>
        </Box>
    );
};