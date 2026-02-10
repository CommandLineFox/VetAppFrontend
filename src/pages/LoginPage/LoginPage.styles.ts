import {styled} from '@mui/material/styles';
import {Box, BoxProps} from '@mui/material';

export const PageContainer = styled(Box)<BoxProps>({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
});