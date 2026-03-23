import React, {useState} from 'react';
import {Grid, Paper, Typography, Box} from '@mui/material';
import {LocalizationProvider, DateCalendar} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {useAppointments} from "../../hooks/useAppointments";
import {GenericTable} from "../../components/GenericTable/GenericTable";
import {APPOINTMENT_COLUMNS} from "../../constants/table.constants";
import {Appointment} from "../../types/appointment.types";

const HomePage = () => {
    const { data, pagination, retry } = useAppointments();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const todaysAppointments = data.filter(app => {
        const appDate = new Date(app.date).toDateString();
        return appDate === selectedDate?.toDateString();
    });

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2, px: 2 }}>
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
                    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, minHeight: '500px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">
                                Appointments for {selectedDate?.toLocaleDateString()}
                            </Typography>
                        </Box>

                        {todaysAppointments.length > 0 && (
                            <GenericTable<Appointment>
                                data={todaysAppointments}
                                columns={APPOINTMENT_COLUMNS}
                                totalCount={todaysAppointments.length}
                                page={0}
                                rowsPerPage={10}
                                onPageChange={() => {
                                }}
                                onRowsPerPageChange={() => {
                                }}
                                title=""
                            />
                        )}

                        {todaysAppointments.length === 0 && (
                            <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
                                No appointments scheduled for this day.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;