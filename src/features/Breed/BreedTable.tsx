import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {BREED_COLUMNS} from "../../constants/table.constants";
import {Breed} from "../../types/breed.types";
import {GeneralTableProps} from "../../types/table.types.ts";

export const BreedTable = (props: GeneralTableProps<Breed>) => (
    <GenericTable<Breed>
        {...props}
        title="Breeds"
        columns={BREED_COLUMNS}
        createPermission={Permission.BREED_ADD}
        editPermission={Permission.BREED_UPDATE}
        deletePermission={Permission.BREED_DELETE}
        onCreate={() => {}}
        onEdit={(item) => {}}
        onDelete={(item) => {}}
    />
);