import React, {useState, useMemo} from 'react';
import {Grid, Paper, Typography, Box} from '@mui/material';
import {LocalizationProvider, DateCalendar} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {useAppointments} from "../../hooks/useAppointments";
import {AppointmentTable} from "../../features/Appointment/AppointmentTable";
import * as styles from "./HomePage.styles";

const HomePage = () => {
    const { data, pagination, retry, searchTerm, setSearchTerm } = useAppointments();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const filteredAppointments = useMemo(() => {
        return data.filter(app => {
            const appDate = new Date(app.date).toDateString();
            return appDate === selectedDate?.toDateString();
        });
    }, [data, selectedDate]);

    return (
        <Box sx={styles.pageContainer}>
            <Typography variant="h4" sx={styles.pageTitle}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                    <Paper sx={styles.calendarPaper}>
                        <Typography variant="h6" sx={styles.sectionTitle}>
                            Calendar
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newDate) => setSelectedDate(newDate)}
                            />
                        </LocalizationProvider>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                    <Paper sx={styles.tablePaper}>
                        <AppointmentTable
                            data={filteredAppointments}
                            totalCount={filteredAppointments.length}
                            page={pagination.params.page}
                            rowsPerPage={pagination.params.size}
                            onPageChange={pagination.onPageChange}
                            onRowsPerPageChange={pagination.onRowsPerPageChange}
                            onSort={pagination.onSort}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            onRefresh={retry}
                            sortBy={pagination.params.sortBy}
                            sortDirection={pagination.params.direction}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;