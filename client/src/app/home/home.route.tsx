import type { RouteObject } from 'react-router-dom';
import { default as HomePage } from './home.page';
import { AuthGuard } from '../auth/auth.page';
import AppLayout from '../../shared/layout';

export const HomeRoute: RouteObject = {
  path: '/',
  element:<AppLayout/>,
  children: [
    {
      index: true,
      element: <AuthGuard children={<HomePage />}/>
    }
  ]
};