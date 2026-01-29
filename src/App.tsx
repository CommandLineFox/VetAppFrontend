import {GoogleOAuthProvider} from "@react-oauth/google";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {GlobalStyles} from "./styles/GlobalStyles";

export const App = () => {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GoogleOAuthProvider clientId={googleClientId}> <LoginPage/> </GoogleOAuthProvider>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;