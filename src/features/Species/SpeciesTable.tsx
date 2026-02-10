import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {SPECIES_COLUMNS} from "../../constants/table.constants";
import {Species} from "../../types/species.types";

interface SpeciesTableProps {
    data: Species[];
    searchTerm?: string;
    onSearchChange?: (val: string) => void;
}

export const SpeciesTable = ({ data, searchTerm, onSearchChange }: SpeciesTableProps) => {
    return (
        <GenericTable<Species>
            title="Species List"
            data={data}
            columns={SPECIES_COLUMNS}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onCreate={() => console.log('Open Add Species Form')}
            createPermission={Permission.SPECIES_ADD}
            onEdit={(species) => console.log('Editing species:', species.name)}
            editPermission={Permission.SPECIES_UPDATE}
            onDelete={(species) => console.log('Deleting ID:', species.id)}
            deletePermission={Permission.SPECIES_DELETE}
        />
    );
};