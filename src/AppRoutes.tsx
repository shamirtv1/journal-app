import {createBrowserRouter} from "react-router-dom";;
import AuthLayout from "./auth/AuthLayout.tsx";
import LoginPage from "./auth/pages/LoginPage.tsx";
import RegisterPage from "./auth/pages/RegisterPage.tsx";
import JournalLayout from "./journal/JournalLayout.tsx";
import JournalPage from "./journal/pages/JournalPage.tsx";
import PrivateRoute from "./auth/components/PrivateRoute.tsx";
import PublicRoute from "./auth/components/PublicRoute.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute Component={<JournalLayout/>} /> ,
        children: [
            {
                path: "home",
                element: <JournalPage />
            }
        ]
    },
    {
        path: "/auth",
        element: <PublicRoute Component={<AuthLayout/>} /> ,
        children: [
            {
                path: "register", element: <RegisterPage/>
            },
            {
                path: "login", element: <LoginPage/>
            },
        ]
    },
]);

export default router;