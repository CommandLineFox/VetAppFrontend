import {styled} from '@mui/material/styles';
import {TableContainer, TableHead, TableRow, Box} from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: theme.shadows[3],
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    '& .MuiTableCell-root': {
        fontWeight: 'bold',
        color: theme.palette.text.primary,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': {
        border: 0
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transition: 'background-color 0.2s ease',
    },
}));

export const ActionsWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
}));