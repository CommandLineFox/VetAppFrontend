import React from 'react';
import {StyledMuiButton} from './Button.styles';
import {ButtonProps as MuiButtonProps} from '@mui/material/Button';

interface ButtonProps extends MuiButtonProps {
    primary?: boolean;
}

export const Button = ({ children, primary, ...rest }: ButtonProps) => {
    return (
        <StyledMuiButton $primary={primary} {...rest}>
            {children}
        </StyledMuiButton>
    );
};