import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {OWNER_COLUMNS} from "../../constants/table.constants";
import {Owner} from "../../types/owner.types";
import {GeneralTableProps} from "../../types/table.types.ts";

export const OwnerTable = (props: GeneralTableProps<Owner>) => (
    <GenericTable<Owner>
        {...props}
        title="Owners"
        columns={OWNER_COLUMNS}
        createPermission={Permission.OWNER_ADD}
        editPermission={Permission.OWNER_UPDATE}
        deletePermission={Permission.OWNER_DELETE}
        onCreate={() => {}}
        onEdit={(item) => {}}
        onDelete={(item) => {}}
    />
);