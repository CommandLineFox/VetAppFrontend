import {GenericModal} from "../../components/GenericModal/GenericModal";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {ConfirmDelete} from "../../components/ConfirmDelete/ConfirmDelete";
import {Permission} from "../../constants/permissions.constants";
import {OWNER_COLUMNS} from "../../constants/table.constants";
import {useTableActions} from "../../hooks/useTableActions";
import {ownerService} from "../../services/owner.service";
import {Owner} from "../../types/owner.types";
import {GeneralTableProps} from "../../types/table.types";
import {OwnerForm} from "./OwnerForm";

export const OwnerTable = (props: GeneralTableProps<Owner> & { onRefresh: () => void }) => {
    const {
        isModalOpen, isDeleteOpen, selectedItem, loading, error,
        handleAdd, handleEdit, handleDeleteClick, confirmDelete,
        closeModal, closeDelete
    } = useTableActions<Owner>(props.onRefresh, async (id) => {
        return ownerService.delete(Number(id));
    });

    return (
        <>
            <GenericTable<Owner>
                {...props}
                title="Owners"
                columns={OWNER_COLUMNS}
                createPermission={Permission.OWNER_ADD}
                editPermission={Permission.OWNER_UPDATE}
                deletePermission={Permission.OWNER_DELETE}
                onCreate={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <GenericModal
                open={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Edit Owner" : "New Owner"}
            >
                <OwnerForm
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
                    label="this owner"
                />
            </GenericModal>
        </>
    );
};