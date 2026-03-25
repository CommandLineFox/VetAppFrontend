import {SxProps, Theme} from '@mui/material';

export const pageContainer: SxProps<Theme> = {
    flexGrow: 1,
    p: 3,
    backgroundColor: (theme) => theme.palette.grey[50],
    minHeight: '100vh'
};

export const pageTitle: SxProps<Theme> = {
    mb: 4,
    fontWeight: 'bold',
    color: 'text.primary'
};

export const calendarPaper: SxProps<Theme> = {
    p: 2,
    borderRadius: 2,
    boxShadow: (theme) => theme.shadows[3]
};

export const tablePaper: SxProps<Theme> = {
    p: 2,
    borderRadius: 2,
    minHeight: '500px',
    boxShadow: (theme) => theme.shadows[3]
};

export const sectionTitle: SxProps<Theme> = {
    mb: 2,
    px: 2,
    fontWeight: 600
};