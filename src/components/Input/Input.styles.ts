import {styled} from '@mui/material/styles';
import {TextField} from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: '6px',
        fontSize: '14px',
        transition: 'all 0.2s',
        '& fieldset': {
            borderColor: '#d9d9d9',
        },
        '&:hover fieldset': {
            borderColor: '#40a9ff',
        },
        '&.Mui-focused fieldset': {
            borderWidth: '1px',
            boxShadow: '0 0 0 2px rgba(24,144,255,0.2)',
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: '14px',
        color: '#262626',
        marginBottom: '4px',
        position: 'relative',
        transform: 'none',
    },
    '& .MuiFormHelperText-root': {
        marginLeft: 0,
        fontSize: '12px',
    }
}));