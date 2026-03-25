import React, {useState, useEffect} from 'react';
import {Box, Alert, MenuItem} from '@mui/material';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import {appointmentService} from '../../services/appointment.service';
import {Appointment, AppointmentCreateDto, AppointmentUpdateDto} from '../../types/appointment.types';
import {usePatientOptions} from '../../hooks/usePatientOptions';
import {useVeterinarianOptions} from '../../hooks/useVeterinarianOptions';

interface AppointmentFormProps {
    initialData: Appointment | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const AppointmentForm = ({ initialData, onSuccess, onCancel }: AppointmentFormProps) => {
    const [formData, setFormData] = useState({
        date: '',
        description: '',
        patientId: '' as number | string,
        veterinarianId: '' as number | string
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { options: patientOptions, loading: loadingPatients } = usePatientOptions();
    const { options: veterinarianOptions, loading: loadingVets } = useVeterinarianOptions();

    useEffect(() => {
        if (initialData) {
            setFormData({
                date: initialData.date ? initialData.date.substring(0, 16) : '',
                description: initialData.description,
                patientId: initialData.patient.id,
                veterinarianId: initialData.veterinarian.id
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
                date: formData.date,
                description: formData.description.trim(),
                patientId: Number(formData.patientId),
                veterinarianId: Number(formData.veterinarianId)
            };

            if (initialData?.id) {
                await appointmentService.update(initialData.id, payload as AppointmentUpdateDto);
            } else {
                await appointmentService.create(payload as AppointmentCreateDto);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error saving appointment.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.date && formData.patientId && formData.veterinarianId;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            data-cy="appointment-form"
        >
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Input
                label="Date & Time"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
                data-cy="appointment-date-input"
            />

            <Input
                select
                label="Patient"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                fullWidth
                required
                disabled={loadingPatients}
                sx={{ mb: 2 }}
                data-cy="appointment-patient-select"
            >
                {patientOptions.map((p) => (
                    <MenuItem
                        key={p.id}
                        value={p.id}
                        data-cy={`patient-option-${p.id}`}
                    >
                        {p.name} (Owner: {p.owner.lastName})
                    </MenuItem>
                ))}
            </Input>

            <Input
                select
                label="Veterinarian"
                name="veterinarianId"
                value={formData.veterinarianId}
                onChange={handleChange}
                fullWidth
                required
                disabled={loadingVets}
                sx={{ mb: 2 }}
                data-cy="appointment-veterinarian-select"
            >
                {veterinarianOptions.map((v) => (
                    <MenuItem
                        key={v.id}
                        value={v.id}
                        data-cy={`veterinarian-option-${v.id}`}
                    >
                        Dr. {v.firstName} {v.lastName}
                    </MenuItem>
                ))}
            </Input>

            <Input
                label="Reason / Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
                data-cy="appointment-description-input"
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                <Button
                    onClick={onCancel}
                    disabled={loading}
                    data-cy="appointment-form-cancel"
                >
                    Cancel
                </Button>
                <Button
                    primary
                    type="submit"
                    disabled={loading || !isFormValid}
                    data-cy="appointment-form-submit"
                >
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </Box>
    );
};