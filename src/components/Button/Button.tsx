import React from 'react';
import {StyledButton} from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    primary?: boolean;
}

export const Button = ({ children, primary, ...rest }: ButtonProps) => {
    return (
        <StyledButton $primary={primary} {...rest}>
            {children}
        </StyledButton>
    );
};