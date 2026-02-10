import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {EXAMINATION_COLUMNS} from "../../constants/table.constants";
import {Examination} from "../../types/examination.types";

interface ExaminationTableProps {
    data: Examination[];
    title?: string;
    searchTerm?: string;
    onSearchChange?: (val: string) => void;
}

export const ExaminationTable = ({ data, title = "Medical Examinations", searchTerm, onSearchChange }: ExaminationTableProps) => {
    return (
        <GenericTable<Examination>
            title={title}
            data={data}
            columns={EXAMINATION_COLUMNS}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onCreate={() => console.log('Open Add Examination Form')}
            createPermission={Permission.EXAMINATION_ADD}
            onEdit={(exam) => console.log('Editing exam:', exam.id)}
            editPermission={Permission.EXAMINATION_UPDATE}
            onDelete={(exam) => console.log('Deleting exam:', exam.id)}
            deletePermission={Permission.EXAMINATION_DELETE}
        />
    );
};