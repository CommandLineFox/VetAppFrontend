import {GenericModal} from "../../components/GenericModal/GenericModal";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {ConfirmDelete} from "../../components/ConfirmDelete/ConfirmDelete";
import {Permission} from "../../constants/permissions.constants";
import {VETERINARIAN_COLUMNS} from "../../constants/table.constants";
import {useTableActions} from "../../hooks/useTableActions";
import {veterinarianService} from "../../services/veterinarian.service";
import {Veterinarian} from "../../types/veterinarian.types";
import {GeneralTableProps} from "../../types/table.types";
import {VeterinarianForm} from "./VeterinarianForm";

export const VeterinarianTable = (props: GeneralTableProps<Veterinarian> & { onRefresh: () => void }) => {
    const {
        isModalOpen,
        isDeleteOpen,
        selectedItem,
        loading,
        error,
        handleAdd,
        handleEdit,
        handleDeleteClick,
        confirmDelete,
        closeModal,
        closeDelete
    } = useTableActions<Veterinarian>(props.onRefresh, async (id) => {
        return veterinarianService.delete(Number(id));
    });

    return (
        <>
            <GenericTable<Veterinarian>
                {...props}
                title="Veterinarians"
                columns={VETERINARIAN_COLUMNS}
                createPermission={Permission.VETERINARIAN_ADD}
                editPermission={Permission.VETERINARIAN_UPDATE}
                deletePermission={Permission.VETERINARIAN_DELETE}
                onCreate={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <GenericModal
                open={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Edit Veterinarian" : "Add New Veterinarian"}
            >
                <VeterinarianForm
                    initialData={selectedItem}
                    onSuccess={() => {
                        closeModal();
                        props.onRefresh();
                    }}
                    onCancel={closeModal}
                />
            </GenericModal>

            <GenericModal
                open={isDeleteOpen}
                onClose={closeDelete}
                title="Delete Confirmation"
                onSave={confirmDelete}
                loading={loading}
                error={error}
                saveLabel="Delete"
            >
                <ConfirmDelete
                    name={`${selectedItem?.firstName} ${selectedItem?.lastName}`}
                    label="this veterinarian"
                />
            </GenericModal>
        </>
    );
};