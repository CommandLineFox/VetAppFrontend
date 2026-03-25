import React, { useState, useEffect } from 'react';
import { Box, Alert, MenuItem } from '@mui/material';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useBreedOptions } from "../../hooks/useBreedOptions.ts";
import { patientService } from '../../services/patient.service';
import { Breed } from "../../types/breed.types.ts";
import { Owner } from "../../types/owner.types.ts";
import { Patient, PatientCreateDto, PatientUpdateDto } from '../../types/patient.types';
import { useOwnerOptions } from '../../hooks/useOwnerOptions';

interface PatientFormProps {
    initialData: Patient | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const PatientForm = ({ initialData, onSuccess, onCancel }: PatientFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        gender: 'M',
        passportNumber: '',
        microchipNumber: '',
        cartonNumber: '',
        ownerId: '' as number | string,
        breedId: '' as number | string
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { options: ownerOptions, loading: loadingOwners } = useOwnerOptions();
    const { options: breedOptions, loading: loadingBreeds } = useBreedOptions();

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                birthDate: initialData.birthDate ? initialData.birthDate.split('T')[0] : '',
                gender: initialData.gender,
                passportNumber: initialData.passportNumber || '',
                microchipNumber: initialData.microchipNumber || '',
                cartonNumber: initialData.cartonNumber?.toString() || '',
                ownerId: initialData.owner.id,
                breedId: initialData.breed.id
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                name: formData.name.trim(),
                birthDate: formData.birthDate || undefined,
                gender: formData.gender,
                passportNumber: formData.passportNumber.trim() || undefined,
                microchipNumber: formData.microchipNumber.trim() || undefined,
                cartonNumber: formData.cartonNumber ? Number(formData.cartonNumber) : undefined,
                ownerId: Number(formData.ownerId),
                breedId: Number(formData.breedId)
            };

            if (initialData?.id) {
                await patientService.update(initialData.id, payload as PatientUpdateDto);
            } else {
                await patientService.create(payload as PatientCreateDto);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error saving patient.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.name && formData.ownerId && formData.breedId;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            data-cy="patient-form"
        >
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Input
                label="Pet Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                data-cy="patient-name-input"
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Input
                    select
                    label="Owner"
                    name="ownerId"
                    value={formData.ownerId}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={loadingOwners}
                    data-cy="patient-owner-select"
                >
                    {ownerOptions.map((owner: Owner) => (
                        <MenuItem
                            key={owner.id}
                            value={owner.id}
                            data-cy={`owner-option-${owner.id}`}
                        >
                            {owner.firstName} {owner.lastName} ({owner.jmbg})
                        </MenuItem>
                    ))}
                </Input>

                <Input
                    select
                    label="Breed"
                    name="breedId"
                    value={formData.breedId}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={loadingBreeds}
                    data-cy="patient-breed-select"
                >
                    {breedOptions.map((breed: Breed) => (
                        <MenuItem
                            key={breed.id}
                            value={breed.id}
                            data-cy={`breed-option-${breed.id}`}
                        >
                            {breed.name} ({breed.species.name})
                        </MenuItem>
                    ))}
                </Input>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Input
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    data-cy="patient-birthdate-input"
                />
                <Input
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    fullWidth
                    data-cy="patient-gender-select"
                >
                    <MenuItem value="M" data-cy="gender-option-male">Male</MenuItem>
                    <MenuItem value="F" data-cy="gender-option-female">Female</MenuItem>
                </Input>
            </Box>

            <Input
                label="Carton Number"
                name="cartonNumber"
                value={formData.cartonNumber}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                data-cy="patient-carton-input"
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Input
                    label="Passport No."
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    fullWidth
                    data-cy="patient-passport-input"
                />
                <Input
                    label="Microchip No."
                    name="microchipNumber"
                    value={formData.microchipNumber}
                    onChange={handleChange}
                    fullWidth
                    data-cy="patient-microchip-input"
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <Button
                    onClick={onCancel}
                    disabled={loading}
                    data-cy="patient-form-cancel"
                >
                    Cancel
                </Button>
                <Button
                    primary
                    type="submit"
                    disabled={loading || !isFormValid}
                    data-cy="patient-form-submit"
                >
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </Box>
    );
};