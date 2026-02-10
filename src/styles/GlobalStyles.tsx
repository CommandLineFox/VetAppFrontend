import React from 'react';
import {GlobalStyles as MuiGlobalStyles} from '@mui/material';

export const GlobalStyles = () => {
    return (
        <MuiGlobalStyles
            styles={{
                '*': {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                    fontFamily: "'Inter', sans-serif",
                },
                body: {
                    backgroundColor: '#f0f2f5',
                    color: '#333',
                },
            }}
        />
    );
};