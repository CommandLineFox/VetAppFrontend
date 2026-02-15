export interface PaginationParams {
    page?: number;
    size?: number;
    sortBy?: string;
    direction?: "asc" | "desc";
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}