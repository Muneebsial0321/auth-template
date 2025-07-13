import { GoogleOAuthProvider } from "@react-oauth/google"
import AppRouter from "./routes"
import { SnackbarProvider } from "./context/SnackBar"
import { GOOGLE_CLIENT_ID } from "./configs/envs"

function App() {
  return (
    <>
      <SnackbarProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AppRouter />
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </>
  )
}

export default App
