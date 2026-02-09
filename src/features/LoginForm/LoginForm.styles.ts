import {styled} from '@mui/material/styles';
import {Paper, Typography, TypographyProps} from '@mui/material';

export const StyledFormContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    '& form': {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
    }
}));

export const StyledTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
    fontWeight: 600
}));