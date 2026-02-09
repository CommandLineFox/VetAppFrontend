import {styled} from '@mui/material/styles';
import {Box, Divider as MuiDivider} from '@mui/material';

export const GoogleWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    gap: theme.spacing(1.5),
}));

export const StyledDivider = styled(MuiDivider)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    fontSize: '14px',
    '&::before, &::after': {
        borderColor: '#d9d9d9',
    },
}));

export const GoogleButtonContainer = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
});