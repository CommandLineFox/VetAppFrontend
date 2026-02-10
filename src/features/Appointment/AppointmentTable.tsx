import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {APPOINTMENT_COLUMNS} from "../../constants/table.constants";
import {Appointment} from "../../types/appointment.types";

interface AppointmentTableProps {
    data: Appointment[];
    searchTerm?: string;
    onSearchChange?: (val: string) => void;
}

export const AppointmentTable = ({ data, searchTerm, onSearchChange }: AppointmentTableProps) => {
    return (
        <GenericTable<Appointment>
            title="Scheduled Appointments"
            data={data}
            columns={APPOINTMENT_COLUMNS}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onCreate={() => console.log('Open Schedule Form')}
            createPermission={Permission.APPOINTMENT_ADD}
            onEdit={(app) => console.log('Editing appointment:', app.id)}
            editPermission={Permission.APPOINTMENT_UPDATE}
            onDelete={(app) => console.log('Canceling appointment:', app.id)}
            deletePermission={Permission.APPOINTMENT_DELETE}
        />
    );
};