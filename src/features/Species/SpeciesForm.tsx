import React, {useState, useEffect} from 'react';
import {Box, Alert} from '@mui/material';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import {speciesService} from '../../services/species.service';
import {Species} from '../../types/species.types';

interface SpeciesFormProps {
    initialData: Species | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const SpeciesForm = ({ initialData, onSuccess, onCancel }: SpeciesFormProps) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
        } else {
            setName('');
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();
        if (!trimmedName) return;

        setLoading(true);
        setError(null);

        try {
            if (initialData?.id) {
                await speciesService.update(initialData.id, { name: trimmedName });
            } else {
                await speciesService.create({ name: trimmedName });
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "There was an error saving the species.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            data-cy="species-form"
        >
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Input
                label="Species name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                data-cy="species-name-input"
                fullWidth
                required
                autoFocus
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <Button
                    onClick={onCancel}
                    disabled={loading}
                    type="button"
                    data-cy="species-form-cancel"
                >
                    Cancel
                </Button>
                <Button
                    primary
                    type="submit"
                    disabled={loading || !name.trim()}
                    data-cy="species-form-submit"
                >
                    {loading ? 'Sending...' : initialData ? 'Save changes' : 'Save species'}
                </Button>
            </Box>
        </Box>
    );
};