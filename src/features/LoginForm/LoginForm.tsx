import {Box} from "@mui/material";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/Button/Button";
import {GoogleButton} from "../../components/Button/GoogleButton";
import {Input} from "../../components/Input/Input";
import {useAuth} from "../../hooks/useAuth";
import {StyledFormContainer, StyledTitle} from './LoginForm.styles';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();

    const [license, setLicense] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError(null);

        if (!license || !password) {
            setValidationError("All fields are required.");
            return;
        }

        const success = await login({
            licenseNumber: Number(license),
            password
        });

        if (success) navigate('/');
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        const success = await login({
            token: credentialResponse.credential
        });

        if (success) navigate('/home');
    };

    const displayError = error || validationError || undefined;

    return (
        <StyledFormContainer elevation={0}>
            <StyledTitle variant="h5" component="h2">
                Veterinarian Login
            </StyledTitle>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Input
                    label="License Number"
                    type="number"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    error={displayError}
                    disabled={loading}
                    data-cy="license-input"
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={displayError}
                    disabled={loading}
                    data-cy="password-input"
                />

                <Button
                    primary
                    type="submit"
                    disabled={loading}
                    data-cy="login-button"
                    fullWidth
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>

                <GoogleButton
                    onSuccess={handleGoogleSuccess}
                    onError={() => setValidationError("Google Login Failed")}
                    width="320"
                />
            </Box>
        </StyledFormContainer>
    );
};