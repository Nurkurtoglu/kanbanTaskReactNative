import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { useState } from 'react';

export default function HomePage() {

    const [isAuth, setIsAuth] = useState<boolean>(true)

    return (
        isAuth ? <Home /> : <LoginPage />
    );

}
