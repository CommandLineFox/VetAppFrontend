import {Typography} from "@mui/material";
import React from "react";
import {HomeWrapper, WelcomeTitle} from "./SpeciesPage.styles";

const SpeciesPage = () => {
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

export default SpeciesPage;