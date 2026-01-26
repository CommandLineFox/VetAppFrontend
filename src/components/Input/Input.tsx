import React from 'react';
import {InputWrapper, StyledInput, ErrorMessage} from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, ...rest }: InputProps) => {
    return (
        <InputWrapper>
            {label && <label>{label}</label>}
            <StyledInput $hasError={!!error} {...rest} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputWrapper>
    );
};