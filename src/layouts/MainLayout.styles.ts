import {styled} from '@mui/material/styles';
import {Box, Container, ContainerProps} from '@mui/material';

export const StyledContent = styled(Container)<ContainerProps>(({ theme }) => ({
    flex: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
}));

export const StyledLayoutWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
});