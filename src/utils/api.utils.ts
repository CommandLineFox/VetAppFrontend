export const cleanParams = (params: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(params).filter(([_, value]) =>
            value !== undefined &&
            value !== null &&
            value !== '' &&
            (Array.isArray(value) ? value.length > 0 : true)
        )
    );
};