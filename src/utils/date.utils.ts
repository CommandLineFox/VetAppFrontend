export function formatDate(dateString: string | Date | undefined) {
    if (!dateString) {
        return "-";
    }

    return new Date(dateString).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export function formatDateTime(dateString: string | Date | undefined) {
    if (!dateString) {
        return "-";
    }

    return new Date(dateString).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}