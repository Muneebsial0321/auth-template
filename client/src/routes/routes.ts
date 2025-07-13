import { AuthRoute } from "../app/auth/auth.route";
import { HomeRoute } from "../app/home/home.route";
import type { RouteObject } from "react-router-dom";


export const AllRoutes: RouteObject[] = [

  HomeRoute,
  AuthRoute
]