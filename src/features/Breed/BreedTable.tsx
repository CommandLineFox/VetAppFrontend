import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {BREED_COLUMNS} from "../../constants/table.constants";
import {Breed} from "../../types/breed.types";

interface BreedTableProps {
    data: Breed[];
    searchTerm?: string;
    onSearchChange?: (val: string) => void;
}

export const BreedTable = ({ data, searchTerm, onSearchChange }: BreedTableProps) => {
    return (
        <GenericTable<Breed>
            title="Breeds"
            data={data}
            columns={BREED_COLUMNS}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onCreate={() => console.log('Open Add Breed Form')}
            createPermission={Permission.BREED_ADD}
            onEdit={(breed) => console.log('Editing breed:', breed.name)}
            editPermission={Permission.BREED_UPDATE}
            onDelete={(breed) => console.log('Deleting breed:', breed.id)}
            deletePermission={Permission.BREED_DELETE}
        />
    );
};