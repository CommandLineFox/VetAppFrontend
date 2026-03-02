import {GenericModal} from "../../components/GenericModal/GenericModal.tsx";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {SPECIES_COLUMNS} from "../../constants/table.constants";
import {useTableActions} from "../../hooks/useTableActions.ts";
import {speciesService} from "../../services/species.service.ts";
import {Species} from "../../types/species.types";
import {GeneralTableProps} from "../../types/table.types.ts";
import {SpeciesForm} from "./SpeciesForm.tsx";

export const SpeciesTable = (props: GeneralTableProps<Species> & { onRefresh: () => void }) => {
    const {
        isModalOpen, isDeleteOpen, selectedItem, loading: actionLoading,
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

            <GenericModal open={isModalOpen} onClose={closeModal} title={selectedItem ? "Edit" : "New"}>
                <SpeciesForm
                    initialData={selectedItem}
                    onSuccess={() => {
                        closeModal();
                        props.onRefresh();
                    }}
                    onCancel={closeModal}
                />
            </GenericModal>

            <GenericModal open={isDeleteOpen} onClose={closeDelete} title="Delete" onSave={confirmDelete} loading={actionLoading}>
                Are you sure you want to delete <b>{selectedItem?.name}</b>?
            </GenericModal>
        </>
    );
};