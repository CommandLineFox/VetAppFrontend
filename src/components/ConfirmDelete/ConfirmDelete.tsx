import React from 'react';
import {Typography, Box} from '@mui/material';

interface ConfirmDeleteProps {
    name?: string;
    label?: string;
}

export const ConfirmDelete = ({ name, label = "this item" }: ConfirmDeleteProps) => (
    <Box sx={{ py: 1 }}>
        <Typography variant="body1">
            Are you sure you want to delete <b>{name || label}</b>?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action is permanent and cannot be undone.
        </Typography>
    </Box>
);