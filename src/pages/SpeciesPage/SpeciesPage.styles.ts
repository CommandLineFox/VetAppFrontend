import {styled} from '@mui/material/styles';
import {Box, Typography, TypographyProps} from '@mui/material';

export const HomeWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5, 2),
    minHeight: '100%',
}));

export const WelcomeTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: '#2c3e50',
    fontWeight: 700,
    marginBottom: theme.spacing(2),
}));