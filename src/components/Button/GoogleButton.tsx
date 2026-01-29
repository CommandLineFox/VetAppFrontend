import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {GoogleWrapper, Divider} from './GoogleButton.styles';

interface GoogleButtonProps {
    onSuccess: (response: any) => void;
    onError: () => void;
    width?: string | number;
}

export const GoogleButton = ({ onSuccess, onError, width = "340" }: GoogleButtonProps) => {
    return (
        <GoogleWrapper>
            <Divider>or</Divider>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                theme="outline"
                shape="rectangular"
                width={width}
            />
        </GoogleWrapper>
    );
};