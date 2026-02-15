import {styled} from '@mui/material/styles';
import {TableContainer, TableHead, TableRow, Box, TableCell} from '@mui/material';

export const StyledHeaderCell = styled(TableCell)<{ minwidth?: number | string }>(({ theme, minwidth }) => ({
    minWidth: minwidth,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
}));

export const TableToolbar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    boxShadow: theme.shadows[3],
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2),
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    '& .MuiTableSortLabel-root': {
        '&:hover': { color: theme.palette.primary.main },
        '&.Mui-active': {
            color: theme.palette.primary.main,
            '& .MuiTableSortLabel-icon': { color: theme.palette.primary.main + ' !important' },
        },
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': { border: 0 },
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