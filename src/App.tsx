import {GoogleOAuthProvider} from "@react-oauth/google";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, createTheme, ThemeProvider} from "@mui/material"; // Dodato ovo
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import {Permission} from "./constants/permissions.constants";
import {AuthProvider} from "./context/AuthContext";
import {MainLayout} from "./layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SpeciesPage from "./pages/SpeciesPage/SpeciesPage";
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
                                <Route path="/species" element={<ProtectedRoute requiredPermission={Permission.SPECIES_LIST}> <SpeciesPage/> </ProtectedRoute>}/>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
};

export default App;