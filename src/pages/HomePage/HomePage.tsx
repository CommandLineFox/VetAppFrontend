import {useNavigate} from "react-router-dom";
import {Button} from "../../components/Button/Button";
import {HomeWrapper, WelcomeTitle} from "./HomePage.styles";

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <HomeWrapper>
            <WelcomeTitle>Welcome</WelcomeTitle>
            <p>Successful login.</p>
            <div style={{ marginTop: '20px' }}>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </HomeWrapper>
    );
};

export default HomePage;