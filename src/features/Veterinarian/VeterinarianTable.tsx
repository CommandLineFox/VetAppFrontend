import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {VETERINARIAN_COLUMNS} from "../../constants/table.constants";
import {GeneralTableProps} from "../../types/table.types.ts";
import {Veterinarian} from "../../types/veterinarian.types";

export const VeterinarianTable = (props: GeneralTableProps<Veterinarian>) => (
    <GenericTable<Veterinarian>
        {...props}
        title="Veterinarians"
        columns={VETERINARIAN_COLUMNS}
        createPermission={Permission.VETERINARIAN_ADD}
        editPermission={Permission.VETERINARIAN_UPDATE}
        deletePermission={Permission.VETERINARIAN_DELETE}
        onCreate={() => {}}
        onEdit={(item) => {}}
        onDelete={(item) => {}}
    />
);