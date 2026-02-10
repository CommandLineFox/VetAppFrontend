import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {PATIENT_COLUMNS} from "../../constants/table.constants";
import {Patient} from "../../types/patient.types";

interface PatientTableProps {
    data: Patient[];
    title?: string;
    searchTerm?: string;
    onSearchChange?: (val: string) => void;
}

export const PatientTable = ({ data, title = "Patients Register", searchTerm, onSearchChange }: PatientTableProps) => {
    return (
        <GenericTable<Patient>
            title={title}
            data={data}
            columns={PATIENT_COLUMNS}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onCreate={() => console.log('Open Add Patient Form')}
            createPermission={Permission.PATIENT_ADD}
            onEdit={(patient) => console.log('Editing patient:', patient.name)}
            editPermission={Permission.PATIENT_UPDATE}
            onDelete={(patient) => console.log('Deleting patient:', patient.id)}
            deletePermission={Permission.PATIENT_DELETE}
        />
    );
};