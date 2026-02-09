import {styled} from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

export const StyledMuiButton = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== '$primary',
})<{ $primary?: boolean }>(({ theme, $primary }) => ({
    padding: '12px 24px',
    borderRadius: '6px',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.2s',

    backgroundColor: $primary ? '#1890ff' : '#f5f5f5',
    color: $primary ? '#fff' : '#000',

    '&:hover': {
        backgroundColor: $primary ? '#0073e6' : '#e0e0e0',
        opacity: 0.8,
    },

    '&:disabled': {
        backgroundColor: '#f5f5f5',
        color: '#b8b8b8',
    },
}));