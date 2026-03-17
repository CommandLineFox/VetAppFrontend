import { GenericModal } from "../../components/GenericModal/GenericModal";
import { GenericTable } from "../../components/GenericTable/GenericTable";
import { ConfirmDelete } from "../../components/ConfirmDelete/ConfirmDelete";
import { Permission } from "../../constants/permissions.constants";
import { APPOINTMENT_COLUMNS } from "../../constants/table.constants";
import { useTableActions } from "../../hooks/useTableActions";
import { appointmentService } from "../../services/appointment.service";
import { Appointment } from "../../types/appointment.types";
import { GeneralTableProps } from "../../types/table.types";
import { AppointmentForm } from "./AppointmentForm";

export const AppointmentTable = (props: GeneralTableProps<Appointment> & { onRefresh: () => void }) => {
    const {
        isModalOpen, isDeleteOpen, selectedItem, loading, error,
        handleAdd, handleEdit, handleDeleteClick, confirmDelete,
        closeModal, closeDelete
    } = useTableActions<Appointment>(props.onRefresh, async (id) => {
        return appointmentService.delete(Number(id));
    });

    return (
        <>
            <GenericTable<Appointment>
                {...props}
                title="Appointments"
                columns={APPOINTMENT_COLUMNS}
                createPermission={Permission.APPOINTMENT_ADD}
                editPermission={Permission.APPOINTMENT_UPDATE}
                deletePermission={Permission.APPOINTMENT_DELETE}
                onCreate={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <GenericModal
                open={isModalOpen}
                onClose={closeModal}
                title={selectedItem ? "Edit Appointment" : "Schedule New Appointment"}
            >
                <AppointmentForm
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
                title="Cancel Appointment"
                onSave={confirmDelete}
                loading={loading}
                error={error}
                saveLabel="Cancel Appointment"
            >
                <ConfirmDelete
                    name={`Appointment for ${selectedItem?.patient.name} on ${selectedItem?.date ? new Date(selectedItem.date).toLocaleString() : ''}`}
                    label="this scheduled appointment"
                />
            </GenericModal>
        </>
    );
};