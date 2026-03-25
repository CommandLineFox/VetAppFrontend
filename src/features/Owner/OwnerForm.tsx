import React, { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { ownerService } from '../../services/owner.service';
import { Owner, OwnerCreateDto, OwnerUpdateDto } from '../../types/owner.types';

interface OwnerFormProps {
    initialData: Owner | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const OwnerForm = ({ initialData, onSuccess, onCancel }: OwnerFormProps) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jmbg: '',
        phoneNumber: '',
        email: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                jmbg: initialData.jmbg,
                phoneNumber: initialData.phoneNumber,
                email: initialData.email,
                address: initialData.address
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
            if (initialData?.id) {
                const updatePayload: OwnerUpdateDto = { ...formData };
                await ownerService.update(initialData.id, updatePayload);
            } else {
                const createPayload: OwnerCreateDto = { ...formData };
                await ownerService.create(createPayload);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error saving owner.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.firstName && formData.lastName && formData.jmbg;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            data-cy="owner-form"
        >
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                data-cy="owner-first-name-input"
            />
            <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                data-cy="owner-last-name-input"
            />
            <Input
                label="JMBG"
                name="jmbg"
                value={formData.jmbg}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
                data-cy="owner-jmbg-input"
            />
            <Input
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                data-cy="owner-phone-input"
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                data-cy="owner-email-input"
            />
            <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                data-cy="owner-address-input"
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <Button
                    onClick={onCancel}
                    disabled={loading}
                    data-cy="owner-form-cancel"
                >
                    Cancel
                </Button>
                <Button
                    primary
                    type="submit"
                    disabled={loading || !isFormValid}
                    data-cy="owner-form-submit"
                >
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </Box>
    );
};