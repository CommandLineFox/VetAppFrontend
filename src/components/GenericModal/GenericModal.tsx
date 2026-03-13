import React from 'react';
import {Dialog, Button, Alert} from '@mui/material';
import {StyledDialogTitle, StyledDialogContent, StyledDialogActions} from './GenericModal.styles';

interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSave?: () => void;
    saveLabel?: string;
    loading?: boolean;
    error?: string | null;
    dataCy?: string;
}

export const GenericModal = ({
                                 open,
                                 onClose,
                                 title,
                                 children,
                                 onSave,
                                 saveLabel = "Save",
                                 loading,
                                 error,
                                 dataCy = 'generic-modal'
                             }: GenericModalProps) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth data-cy={dataCy}>
        <StyledDialogTitle data-cy={`${dataCy}-title`}>
            {title}
        </StyledDialogTitle>

        <StyledDialogContent dividers>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} data-cy={`${dataCy}-error`}>
                    {error}
                </Alert>
            )}

            <div data-cy={`${dataCy}-content`}>
                {children}
            </div>
        </StyledDialogContent>

        {onSave && (
            <StyledDialogActions>
                <Button
                    onClick={onClose}
                    color="inherit"
                    disabled={loading}
                    data-cy={`${dataCy}-cancel-btn`}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSave}
                    variant="contained"
                    color={title.toLowerCase().includes('delete') ? 'error' : 'primary'}
                    disabled={loading}
                    data-cy={`${dataCy}-save-btn`}
                >
                    {loading ? 'Sending...' : saveLabel}
                </Button>
            </StyledDialogActions>
        )}
    </Dialog>
);