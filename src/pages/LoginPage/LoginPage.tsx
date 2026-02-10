import React from 'react';
import { LoginForm } from "../../features/LoginForm/LoginForm";
import { PageContainer } from "./LoginPage.styles";

const LoginPage = () => {
    return (
        <PageContainer component="main">
            <LoginForm />
        </PageContainer>
    );
};

export default LoginPage;