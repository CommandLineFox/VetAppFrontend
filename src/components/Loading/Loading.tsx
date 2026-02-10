import React from 'react';
import {CircularProgress, Typography} from '@mui/material';
import {StyledLoadingContainer} from './Loading.styles';

interface LoadingProps {
    message?: string;
    minHeight?: string | number;
}

export const Loading = ({ message = "Učitavanje...", minHeight }: LoadingProps) => {
    return (
        <StyledLoadingContainer minHeight={minHeight}>
            <CircularProgress size={45} thickness={4} color="primary"/>
            {message && (
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            )}
        </StyledLoadingContainer>
    );
};