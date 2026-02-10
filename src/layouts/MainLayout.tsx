import React from "react";
import {Outlet} from "react-router-dom";
import {Navbar} from "../features/Navbar/Navbar";
import {StyledContent, StyledLayoutWrapper} from "./MainLayout.styles";

export const MainLayout: React.FC = () => {
    return (
        <StyledLayoutWrapper>
            <Navbar/>
            <StyledContent component="main" maxWidth="lg">
                <Outlet/>
            </StyledContent>
        </StyledLayoutWrapper>
    );
};