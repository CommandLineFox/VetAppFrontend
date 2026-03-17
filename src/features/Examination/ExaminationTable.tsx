import {GenericModal} from "../../components/GenericModal/GenericModal";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {ConfirmDelete} from "../../components/ConfirmDelete/ConfirmDelete";
import {Permission} from "../../constants/permissions.constants";
import {EXAMINATION_COLUMNS} from "../../constants/table.constants";
import {useTableActions} from "../../hooks/useTableActions";
import {examinationService} from "../../services/examination.service";
import {Examination} from "../../types/examination.types";
import {GeneralTableProps} from "../../types/table.types";
import {ExaminationForm} from "./ExaminationForm";

export const ExaminationTable = (props: GeneralTableProps<Examination> & { onRefresh: () => void }) => {
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
    } = useTableActions<Examination>(props.onRefresh, async (id) => {
        return examinationService.delete(Number(id));
    });

    return (
        <>
            <GenericTable<Examination>
                {...props}
                title="Medical Examinations"
                columns={EXAMINATION_COLUMNS}
                createPermission={Permission.EXAMINATION_ADD}
                editPermission={Permission.EXAMINATION_UPDATE}
                deletePermission={Permission.EXAMINATION_DELETE}
                onCreate={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <GenericModal
                open={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Edit Examination Record" : "New Examination Entry"}
            >
                <ExaminationForm
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
                title="Delete Medical Record"
                onSave={confirmDelete}
                loading={loading}
                error={error}
                saveLabel="Delete"
            >
                <ConfirmDelete
                    name={`Examination for ${selectedItem?.patient.name}`}
                    label={`dated ${selectedItem?.date ? new Date(selectedItem.date).toLocaleDateString() : ''}`}
                />
            </GenericModal>
        </>
    );
};