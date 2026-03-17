import {GenericModal} from "../../components/GenericModal/GenericModal";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {ConfirmDelete} from "../../components/ConfirmDelete/ConfirmDelete";
import {Permission} from "../../constants/permissions.constants";
import {PATIENT_COLUMNS} from "../../constants/table.constants";
import {useTableActions} from "../../hooks/useTableActions";
import {patientService} from "../../services/patient.service";
import {Patient} from "../../types/patient.types";
import {GeneralTableProps} from "../../types/table.types";
import {PatientForm} from "./PatientForm";

export const PatientTable = (props: GeneralTableProps<Patient> & { onRefresh: () => void }) => {
    const {
        isModalOpen, isDeleteOpen, selectedItem, loading, error,
        handleAdd, handleEdit, handleDeleteClick, confirmDelete,
        closeModal, closeDelete
    } = useTableActions<Patient>(props.onRefresh, async (id) => {
        return patientService.delete(Number(id));
    });

    return (
        <>
            <GenericTable<Patient>
                {...props}
                title="Patients"
                columns={PATIENT_COLUMNS}
                createPermission={Permission.PATIENT_ADD}
                editPermission={Permission.PATIENT_UPDATE}
                deletePermission={Permission.PATIENT_DELETE}
                onCreate={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <GenericModal
                open={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Edit Patient Record" : "New Patient Entry"}
            >
                <PatientForm
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
                    name={selectedItem?.name}
                    label="this patient's entire medical record"
                />
            </GenericModal>
        </>
    );
};