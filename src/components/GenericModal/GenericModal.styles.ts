import {styled, DialogTitle, DialogContent, DialogActions} from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(2),
    fontWeight: 'bold',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    minWidth: '450px',
    [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
    },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2),
}));