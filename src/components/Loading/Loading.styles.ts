import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';

interface StyledLoadingContainerProps {
    minHeight?: string | number;
}

export const StyledLoadingContainer = styled(Box)<StyledLoadingContainerProps>(({ minHeight }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: minHeight || '400px',
    gap: '16px'
}));