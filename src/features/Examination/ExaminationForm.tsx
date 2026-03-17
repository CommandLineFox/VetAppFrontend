import React, {useState, useEffect} from 'react';
import {Box, Alert, MenuItem} from '@mui/material';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import {examinationService} from '../../services/examination.service';
import {Examination, ExaminationCreateDto, ExaminationUpdateDto} from '../../types/examination.types';
import {usePatientOptions} from '../../hooks/usePatientOptions';
import {useVeterinarianOptions} from '../../hooks/useVeterinarianOptions';

interface ExaminationFormProps {
    initialData: Examination | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const ExaminationForm = ({ initialData, onSuccess, onCancel }: ExaminationFormProps) => {
    const [formData, setFormData] = useState({
        date: '',
        anamnesis: '',
        clinicalPresentation: '',
        diagnosis: '',
        treatment: '',
        laboratoryAnalysis: '',
        specialistExamination: '',
        remarks: '',
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
                anamnesis: initialData.anamnesis || '',
                clinicalPresentation: initialData.clinicalPresentation || '',
                diagnosis: initialData.diagnosis || '',
                treatment: initialData.treatment || '',
                laboratoryAnalysis: initialData.laboratoryAnalysis || '',
                specialistExamination: initialData.specialistExamination || '',
                remarks: initialData.remarks || '',
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
                anamnesis: formData.anamnesis.trim(),
                clinicalPresentation: formData.clinicalPresentation.trim(),
                diagnosis: formData.diagnosis.trim(),
                treatment: formData.treatment.trim(),
                laboratoryAnalysis: formData.laboratoryAnalysis.trim() || undefined,
                specialistExamination: formData.specialistExamination.trim() || undefined,
                remarks: formData.remarks.trim() || undefined,
                patientId: Number(formData.patientId),
                veterinarianId: Number(formData.veterinarianId)
            };

            if (initialData?.id) {
                await examinationService.update(initialData.id, payload as ExaminationUpdateDto);
            } else {
                await examinationService.create(payload as ExaminationCreateDto);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || "Error saving examination record.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.date && formData.anamnesis && formData.clinicalPresentation &&
        formData.diagnosis && formData.treatment && formData.patientId && formData.veterinarianId;

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}

            <Input
                label="Examination Date & Time"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
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
            >
                {patientOptions.map((p) => (
                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
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
            >
                {veterinarianOptions.map((v) => (
                    <MenuItem key={v.id} value={v.id}>Dr. {v.lastName}</MenuItem>
                ))}
            </Input>

            <Input label="Anamnesis" name="anamnesis" value={formData.anamnesis} onChange={handleChange} fullWidth required multiline rows={2}/>
            <Input label="Clinical Presentation" name="clinicalPresentation" value={formData.clinicalPresentation} onChange={handleChange} fullWidth required multiline rows={2}/>
            <Input label="Diagnosis" name="diagnosis" value={formData.diagnosis} onChange={handleChange} fullWidth required multiline rows={2}/>
            <Input label="Treatment" name="treatment" value={formData.treatment} onChange={handleChange} fullWidth required multiline rows={2}/>
            <Input label="Laboratory Analysis" name="laboratoryAnalysis" value={formData.laboratoryAnalysis} onChange={handleChange} fullWidth multiline rows={2}/>
            <Input label="Specialist Examination" name="specialistExamination" value={formData.specialistExamination} onChange={handleChange} fullWidth multiline rows={2}/>
            <Input label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} fullWidth multiline rows={2}/>

            <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'flex-end' }}>
                <Button onClick={onCancel} disabled={loading}>Cancel</Button>
                <Button primary type="submit" disabled={loading || !isFormValid}>
                    {loading ? 'Saving...' : 'Save Record'}
                </Button>
            </Box>
        </Box>
    );
};