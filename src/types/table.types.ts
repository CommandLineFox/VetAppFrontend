import {ReactNode} from "react";

export interface Column<T> {
    id: keyof T | string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
    render?: (item: T) => ReactNode;
}

export interface GeneralTableProps<T> {
    data: T[];
    totalCount: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    onSort?: (property: string) => void;

    searchTerm?: string;
    onSearchChange?: (val: string) => void;
    onRowClick?: (item: T) => void;
}