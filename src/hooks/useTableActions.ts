import {useState} from 'react';

export const useTableActions = <T extends { id?: string | number }>(
    onSuccess: () => void,
    deleteFn?: (id: string | number) => Promise<any>
) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAdd = () => {
        setSelectedItem(null);
        setModalOpen(true);
    };

    const handleEdit = (item: T) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleDeleteClick = (item: T) => {
        setSelectedItem(item);
        setDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedItem?.id || !deleteFn) return;
        setLoading(true);
        try {
            await deleteFn(selectedItem.id);
            onSuccess();
            setDeleteOpen(false);
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    const closeDelete = () => {
        setDeleteOpen(false);
        setSelectedItem(null);
    };

    return { isModalOpen, isDeleteOpen, selectedItem, loading, handleAdd, handleEdit, handleDeleteClick, confirmDelete, closeModal, closeDelete };
};