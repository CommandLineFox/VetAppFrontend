import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {SPECIES_COLUMNS} from "../../constants/table.constants";
import {Species} from "../../types/species.types";
import {GeneralTableProps} from "../../types/table.types.ts";

export const SpeciesTable = (props: GeneralTableProps<Species>) => (
    <GenericTable<Species>
        {...props}
        title="Species"
        columns={SPECIES_COLUMNS}
        createPermission={Permission.SPECIES_ADD}
        editPermission={Permission.SPECIES_UPDATE}
        deletePermission={Permission.SPECIES_DELETE}
        onCreate={() => {}}
        onEdit={(item) => {}}
        onDelete={(item) => {}}
    />
);