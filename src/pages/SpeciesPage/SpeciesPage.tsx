import {useEffect, useState} from "react";
import {Loading} from "../../components/Loading/Loading";
import {SpeciesTable} from "../../features/Species/SpeciesTable";
import {speciesService} from "../../services/species.service";
import {Species} from "../../types/species.types";
import {HomeWrapper} from "./SpeciesPage.styles";

const SpeciesPage = () => {
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const data = await speciesService.findAll();
                setSpecies(data);
            } catch (error) {
                console.error("Error while fetching species:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpecies();
    }, []);

    if (loading) {
        return (
            <Loading message="Fetching species..."/>
        );
    }

    return (
        <HomeWrapper>
            <SpeciesTable
                data={species}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
        </HomeWrapper>
    );
};

export default SpeciesPage;