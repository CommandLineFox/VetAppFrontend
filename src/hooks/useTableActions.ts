import {useState} from 'react';

export const useTableActions = <T extends { id?: string | number }>(
    onSuccess: () => void,
    deleteFn?: (id: string | number) => Promise<any>
) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAdd = () => {
        setSelectedItem(null);
        setError(null);
        setModalOpen(true);
    };

    const handleEdit = (item: T) => {
        setSelectedItem(item);
        setError(null);
        setModalOpen(true);
    };

    const handleDeleteClick = (item: T) => {
        setSelectedItem(item);
        setError(null);
        setDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedItem?.id || !deleteFn) return;
        setLoading(true);
        setError(null);
        try {
            await deleteFn(selectedItem.id);
            onSuccess();
            closeDelete();
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred while deleting the item.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
        setError(null);
    };

    const closeDelete = () => {
        setDeleteOpen(false);
        setSelectedItem(null);
        setError(null);
    };

    return {
        isModalOpen, isDeleteOpen, selectedItem, loading, error,
        handleAdd, handleEdit, handleDeleteClick, confirmDelete,
        closeModal, closeDelete
    };
};