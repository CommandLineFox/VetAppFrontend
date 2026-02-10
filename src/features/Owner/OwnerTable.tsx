import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {OWNER_COLUMNS} from "../../constants/table.constants";
import {Owner} from "../../types/owner.types";

interface OwnerTableProps {
    data: Owner[];
    searchTerm?: string;
    onSearchChange?: (val: string) => void;
}

export const OwnerTable = ({ data, searchTerm, onSearchChange }: OwnerTableProps) => {
    return (
        <GenericTable<Owner>
            title="Owners"
            data={data}
            columns={OWNER_COLUMNS}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onCreate={() => console.log('Open Add Owner Form')}
            createPermission={Permission.OWNER_ADD}
            onEdit={(owner) => console.log('Editing owner:', owner.lastName)}
            editPermission={Permission.OWNER_UPDATE}
            onDelete={(owner) => console.log('Deleting owner:', owner.id)}
            deletePermission={Permission.OWNER_DELETE}
        />
    );
};