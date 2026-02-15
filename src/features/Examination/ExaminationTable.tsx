import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {EXAMINATION_COLUMNS} from "../../constants/table.constants";
import {Examination} from "../../types/examination.types";
import {GeneralTableProps} from "../../types/table.types.ts";

export const ExaminationTable =(props: GeneralTableProps<Examination>) => (
    <GenericTable<Examination>
        {...props}
        title="Breeds"
        columns={EXAMINATION_COLUMNS}
        createPermission={Permission.EXAMINATION_ADD}
        editPermission={Permission.EXAMINATION_UPDATE}
        deletePermission={Permission.EXAMINATION_DELETE}
        onCreate={() => {}}
        onEdit={(item) => {}}
        onDelete={(item) => {}}
    />
);