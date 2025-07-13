import { GoogleOAuthProvider } from "@react-oauth/google"
import AppRouter from "./routes"
import { SnackbarProvider } from "./context/SnackBar"

function App() {
  return (
    <>
      <SnackbarProvider>
        <GoogleOAuthProvider clientId="">
          <AppRouter />
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </>
  )
}

export default App
