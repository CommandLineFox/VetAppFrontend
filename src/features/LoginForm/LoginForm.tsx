import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import {useAuth} from "../../hooks/useAuth";
import {FormContainer, Title} from './LoginForm.styles';

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

        if (success) {
            navigate('/home');
        }
    };

    const displayError = error || validationError || undefined;

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Veterinarian Login</Title>

            <Input
                label="License Number"
                type="number"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                error={displayError}
                placeholder=""
                disabled={loading}
                data-cy="license-input"
            />

            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={displayError}
                placeholder=""
                disabled={loading}
                data-cy="password-input"
            />

            <Button
                primary
                type="submit"
                disabled={loading}
                data-cy="login-button"
            >
                {loading ? 'Logging in...' : 'Login'}
            </Button>
        </FormContainer>
    );
};