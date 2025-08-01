import type { RouteObject } from 'react-router-dom';
import LoginPage from './login/login.page';
import RegisterPage from './register/register.page';
import AppLayout from '../../shared/layout';

export const AuthRoute: RouteObject = {
    path: "/auth",
    element:<AppLayout/>,
    children: [
        {
            index: true,
            path: "login",
            element: <LoginPage />
        },
        {
            path: "register",
            element: <RegisterPage />
        }
    ]
}
