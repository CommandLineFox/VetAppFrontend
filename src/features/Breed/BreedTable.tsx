import {GenericModal} from "../../components/GenericModal/GenericModal";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {ConfirmDelete} from "../../components/ConfirmDelete/ConfirmDelete";
import {Permission} from "../../constants/permissions.constants";
import {BREED_COLUMNS} from "../../constants/table.constants";
import {useTableActions} from "../../hooks/useTableActions";
import {breedService} from "../../services/breed.service";
import {Breed} from "../../types/breed.types";
import {GeneralTableProps} from "../../types/table.types";
import {BreedForm} from "./BreedForm";

export const BreedTable = (props: GeneralTableProps<Breed> & { onRefresh: () => void }) => {
    const {
        isModalOpen, isDeleteOpen, selectedItem, loading, error,
        handleAdd, handleEdit, handleDeleteClick, confirmDelete,
        closeModal, closeDelete
    } = useTableActions<Breed>(props.onRefresh, async (id) => {
        return breedService.delete(Number(id));
    });

    return (
        <>
            <GenericTable<Breed>
                {...props}
                title="Breeds"
                columns={BREED_COLUMNS}
                createPermission={Permission.BREED_ADD}
                editPermission={Permission.BREED_UPDATE}
                deletePermission={Permission.BREED_DELETE}
                onCreate={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <GenericModal
                open={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Edit Breed" : "New Breed"}
            >
                <BreedForm
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
                <ConfirmDelete name={selectedItem?.name} label="this breed"/>
            </GenericModal>
        </>
    );
};