import {GenericTable} from "../../components/GenericTable/GenericTable";
import {Permission} from "../../constants/permissions.constants";
import {VETERINARIAN_COLUMNS} from "../../constants/table.constants";
import {Veterinarian} from "../../types/veterinarian.types";

interface VeterinarianTableProps {
    data: Veterinarian[];
    searchTerm?: string;
    onSearchChange?: (val: string) => void;
}

export const VeterinarianTable = ({ data, searchTerm, onSearchChange }: VeterinarianTableProps) => {
    return (
        <GenericTable<Veterinarian>
            title="Veterinarians"
            data={data}
            columns={VETERINARIAN_COLUMNS}
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onCreate={() => console.log('Open Add Vet Form')}
            createPermission={Permission.VETERINARIAN_ADD}
            onEdit={(vet) => console.log('Editing vet:', vet.lastName)}
            editPermission={Permission.VETERINARIAN_UPDATE}
            onDelete={(vet) => console.log('Deleting vet:', vet.id)}
            deletePermission={Permission.VETERINARIAN_DELETE}
        />
    );
};