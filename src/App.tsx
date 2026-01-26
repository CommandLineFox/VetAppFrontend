import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {GlobalStyles} from "./styles/GlobalStyles";

export const App = () => {
    return (
        <>
            <GlobalStyles/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;