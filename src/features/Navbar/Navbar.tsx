import React from 'react';
import {Toolbar, Stack, Box} from '@mui/material';
import {NAV_ITEMS} from "../../constants/navigation.constants";
import {useAuthContext} from "../../context/AuthContext";
import {HasPermission} from "../../components/Auth/HasPermission";
import {StyledAppBar, NavLink, NavLogoutButton} from "./Navbar.styles";

export const Navbar: React.FC = () => {
    const { logout, isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <StyledAppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={3} alignItems="center">
                    {NAV_ITEMS.map((item) => (
                        <React.Fragment key={item.to}>
                            {item.permission ? (
                                <HasPermission requiredPermission={item.permission}>
                                    <NavLink to={item.to}>{item.label}</NavLink>
                                </HasPermission>
                            ) : (
                                <NavLink to={item.to}>{item.label}</NavLink>
                            )}
                        </React.Fragment>
                    ))}
                </Stack>

                <NavLogoutButton
                    variant="contained"
                    onClick={logout}
                    size="small"
                >
                    Logout
                </NavLogoutButton>
            </Toolbar>
        </StyledAppBar>
    );
};