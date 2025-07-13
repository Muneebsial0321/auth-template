// src/layouts/AppLayout.tsx
import { Outlet } from "react-router-dom";
import TopLoadingBar from "./TopLoadingBar";

export default function AppLayout() {
  return (
    <>
      <TopLoadingBar />
      <Outlet />
    </>
  )
}
