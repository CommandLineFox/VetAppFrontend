import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleWrapper, StyledDivider, GoogleButtonContainer } from './GoogleButton.styles';

interface GoogleButtonProps {
    onSuccess: (response: any) => void;
    onError: () => void;
    width?: string | number;
}

export const GoogleButton = ({ onSuccess, onError, width = "340" }: GoogleButtonProps) => {
    return (
        <GoogleWrapper>
            <StyledDivider>or</StyledDivider>

            <GoogleButtonContainer>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onError}
                    theme="outline"
                    shape="rectangular"
                    width={width}
                />
            </GoogleButtonContainer>
        </GoogleWrapper>
    );
};