import React, {useState, useEffect} from 'react';
import {Box, Alert, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Select, SelectChangeEvent} from '@mui/material';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import {veterinarianService} from '../../services/veterinarian.service';
import {Veterinarian, VeterinarianCreateDto, VeterinarianUpdateDto} from '../../types/veterinarian.types';
import {Permission} from '../../constants/permissions.constants';

interface VeterinarianFormProps {
    initialData: Veterinarian | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const VeterinarianForm = ({ initialData, onSuccess, onCancel }: VeterinarianFormProps) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        licenseNumber: '',
        email: '',
        password: '',
    });
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const allPermissions = Object.values(Permission);

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                licenseNumber: initialData.licenseNumber.toString(),
                email: initialData.email,
                password: '',
            });
            setSelectedPermissions(initialData.permissions || []);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setSelectedPermissions(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const commonData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                licenseNumber: Number(formData.licenseNumber),
                email: formData.email,
                permissions: selectedPermissions,
            };

            if (initialData?.id) {
                const updatePayload: VeterinarianUpdateDto = {
                    ...commonData,
                    ...(formData.password ? { password: formData.password } : {})
                };
                await veterinarianService.update(initialData.id, updatePayload);
            } else {
                const createPayload: VeterinarianCreateDto = {
                    ...commonData,
                    password: formData.password,
                };
                await veterinarianService.create(createPayload);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred while saving the veterinarian.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required sx={{ mb: 2 }}/>
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth required sx={{ mb: 2 }}/>
            <Input label="License Number" name="licenseNumber" type="number" value={formData.licenseNumber} onChange={handleChange} fullWidth required sx={{ mb: 2 }}/>
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required sx={{ mb: 2 }}/>

            <Input
                label={initialData ? "New Password (optional)" : "Password"}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required={!initialData}
                sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Permissions</InputLabel>
                <Select
                    multiple
                    value={selectedPermissions}
                    onChange={handlePermissionChange}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                >
                    {allPermissions.map((perm) => (
                        <MenuItem key={perm} value={perm}>
                            <Checkbox checked={selectedPermissions.indexOf(perm) > -1}/>
                            <ListItemText primary={perm}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <Button onClick={onCancel} disabled={loading}>Cancel</Button>
                <Button primary type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </Box>
    );
};