import {GoogleOAuthProvider} from "@react-oauth/google";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, createTheme, ThemeProvider} from "@mui/material";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import {Permission} from "./constants/permissions.constants";
import {AuthProvider} from "./context/AuthContext";
import {MainLayout} from "./layouts/MainLayout";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage.tsx";
import BreedPage from "./pages/BreedPage/BreedPage.tsx";
import ExaminationPage from "./pages/ExaminationPage/ExaminationPage.tsx";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OwnerPage from "./pages/OwnerPage/OwnerPage.tsx";
import PatientPage from "./pages/PatientPage/PatientPage.tsx";
import SpeciesPage from "./pages/SpeciesPage/SpeciesPage";
import VeterinarianPage from "./pages/VeterinarianPage/VeterinarianPage.tsx";
import {GlobalStyles} from "./styles/GlobalStyles";

const theme = createTheme();

const App = () => {
    const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID || '';

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <GlobalStyles/>

                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/login" element={<LoginPage/>}/>

                            <Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
                                <Route path="/" element={<HomePage/>}/>

                                <Route path="/appointments" element={<ProtectedRoute requiredPermission={Permission.APPOINTMENT_LIST}> <AppointmentPage/> </ProtectedRoute>}/>
                                <Route path="/breeds" element={<ProtectedRoute requiredPermission={Permission.BREED_LIST}> <BreedPage/> </ProtectedRoute>}/>
                                <Route path="/examinations" element={<ProtectedRoute requiredPermission={Permission.EXAMINATION_LIST}> <ExaminationPage/> </ProtectedRoute>}/>
                                <Route path="/owners" element={<ProtectedRoute requiredPermission={Permission.OWNER_LIST}> <OwnerPage/> </ProtectedRoute>}/>
                                <Route path="/patients" element={<ProtectedRoute requiredPermission={Permission.PATIENT_LIST}> <PatientPage/> </ProtectedRoute>}/>
                                <Route path="/species" element={<ProtectedRoute requiredPermission={Permission.SPECIES_LIST}> <SpeciesPage/> </ProtectedRoute>}/>
                                <Route path="/veterinarians" element={<ProtectedRoute requiredPermission={Permission.VETERINARIAN_LIST}> <VeterinarianPage/> </ProtectedRoute>}/>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
};

export default App;