import {GenericModal} from "../../components/GenericModal/GenericModal";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {ConfirmDelete} from "../../components/ConfirmDelete/ConfirmDelete";
import {Permission} from "../../constants/permissions.constants";
import {SPECIES_COLUMNS} from "../../constants/table.constants";
import {useTableActions} from "../../hooks/useTableActions";
import {speciesService} from "../../services/species.service";
import {Species} from "../../types/species.types";
import {GeneralTableProps} from "../../types/table.types";
import {SpeciesForm} from "./SpeciesForm";

export const SpeciesTable = (props: GeneralTableProps<Species> & { onRefresh: () => void }) => {
    const {
        isModalOpen, isDeleteOpen, selectedItem, loading, error,
        handleAdd, handleEdit, handleDeleteClick, confirmDelete,
        closeModal, closeDelete
    } = useTableActions<Species>(props.onRefresh, async (id) => {
        return speciesService.delete(Number(id));
    });

    return (
        <>
            <GenericTable<Species>
                {...props}
                title="Species"
                columns={SPECIES_COLUMNS}
                createPermission={Permission.SPECIES_ADD}
                editPermission={Permission.SPECIES_UPDATE}
                deletePermission={Permission.SPECIES_DELETE}
                onCreate={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <GenericModal
                open={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Edit Species" : "New Species"}
            >
                <SpeciesForm
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
                <ConfirmDelete name={selectedItem?.name} label="this species"/>
            </GenericModal>
        </>
    );
};