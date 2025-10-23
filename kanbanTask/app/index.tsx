import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { useState } from 'react';
import { Text } from 'react-native';


export default function HomePage() {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    return (
        isAuth ? <Home /> : <LoginPage />

    );

}
