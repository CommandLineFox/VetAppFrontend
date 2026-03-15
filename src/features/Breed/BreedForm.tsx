import React, {useState, useEffect} from 'react';
import {Box, Alert, MenuItem} from '@mui/material';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import {breedService} from '../../services/breed.service';
import {Breed} from '../../types/breed.types';
import {useSpeciesOptions} from '../../hooks/useSpeciesOptions';

interface BreedFormProps {
    initialData: Breed | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const BreedForm = ({ initialData, onSuccess, onCancel }: BreedFormProps) => {
    const [name, setName] = useState('');
    const [speciesId, setSpeciesId] = useState<number | string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { options: speciesOptions, loading: loadingSpecies } = useSpeciesOptions();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setSpeciesId(initialData.species?.id || '');
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !speciesId) return;

        setLoading(true);
        setError(null);

        try {
            const payload = { name: name.trim(), speciesId: Number(speciesId) };
            if (initialData?.id) {
                await breedService.update(initialData.id, payload);
            } else {
                await breedService.create(payload);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error saving breed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Input
                select
                label="Species"
                value={speciesId}
                onChange={(e) => setSpeciesId(e.target.value)}
                disabled={loading || loadingSpecies}
                fullWidth
                required
                sx={{ mb: 2 }}
            >
                {speciesOptions.map((species) => (
                    <MenuItem key={species.id} value={species.id}>
                        {species.name}
                    </MenuItem>
                ))}
            </Input>

            <Input
                label="Breed name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                fullWidth
                required
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <Button onClick={onCancel} disabled={loading}>Cancel</Button>
                <Button primary type="submit" disabled={loading || !name.trim() || !speciesId}>
                    {loading ? 'Sending...' : 'Save'}
                </Button>
            </Box>
        </Box>
    );
};