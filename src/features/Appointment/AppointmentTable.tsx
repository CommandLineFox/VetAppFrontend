import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {APPOINTMENT_COLUMNS} from "../../constants/table.constants";
import {Appointment} from "../../types/appointment.types";
import {GeneralTableProps} from "../../types/table.types.ts";

export const AppointmentTable = (props: GeneralTableProps<Appointment>) => (
    <GenericTable<Appointment>
        {...props}
        title="Scheduled Appointments"
        columns={APPOINTMENT_COLUMNS}
        createPermission={Permission.APPOINTMENT_ADD}
        editPermission={Permission.APPOINTMENT_UPDATE}
        deletePermission={Permission.APPOINTMENT_DELETE}
        onCreate={() => console.log('Open Add Form')}
        onEdit={(item) => console.log('Edit', item.id)}
        onDelete={(item) => console.log('Delete', item.id)}
    />
);