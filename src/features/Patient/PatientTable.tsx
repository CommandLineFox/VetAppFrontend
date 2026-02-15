import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {PATIENT_COLUMNS} from "../../constants/table.constants";
import {Patient} from "../../types/patient.types.ts";
import {GeneralTableProps} from "../../types/table.types.ts";

export const PatientTable = (props: GeneralTableProps<Patient>) => (
    <GenericTable<Patient>
        {...props}
        title="Patients"
        columns={PATIENT_COLUMNS}
        createPermission={Permission.PATIENT_ADD}
        editPermission={Permission.PATIENT_UPDATE}
        deletePermission={Permission.PATIENT_DELETE}
        onCreate={() => {}}
        onEdit={(item) => {}}
        onDelete={(item) => {}}
    />
);