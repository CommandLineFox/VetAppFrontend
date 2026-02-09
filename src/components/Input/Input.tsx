import React from 'react';
import {StyledTextField} from './Input.styles';
import {TextFieldProps} from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'error'> {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, ...rest }: InputProps) => {
    return (
        <StyledTextField
            label={label}
            error={!!error}
            helperText={error}
            variant="outlined"
            fullWidth
            InputLabelProps={{
                shrink: true,
            }}
            {...rest}
        />
    );
};