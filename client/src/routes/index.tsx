// src/router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AllRoutes } from "./routes";

const router = createBrowserRouter(AllRoutes);

export default function AppRouter() {
    return <>
    <RouterProvider router={router} />
    </>
}
