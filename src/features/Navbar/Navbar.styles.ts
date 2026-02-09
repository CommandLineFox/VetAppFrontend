import {styled} from '@mui/material/styles';
import {AppBar, Button as MuiButton} from '@mui/material';
import {Link} from 'react-router-dom';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#2c3e50',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

export const NavLink = styled(Link)({
    color: 'white',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.9rem',
    transition: 'color 0.3s',
    '&:hover': {
        color: '#3498db',
    },
});

export const NavLogoutButton = styled(MuiButton)({
    backgroundColor: '#e74c3c',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#c0392b',
    },
});