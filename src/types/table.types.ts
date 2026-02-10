import {ReactNode} from "react";

export interface Column<T> {
    id: keyof T | string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
    render?: (item: T) => ReactNode;
}