import React from 'react';
import { Typography } from '@mui/material';
import { HomeWrapper, WelcomeTitle } from "./HomePage.styles";

const HomePage = () => {
    return (
        <HomeWrapper>
            <WelcomeTitle variant="h3" component="h1">
                Welcome
            </WelcomeTitle>
            <Typography variant="body1">
                Successful login
            </Typography>
        </HomeWrapper>
    );
};

export default HomePage;