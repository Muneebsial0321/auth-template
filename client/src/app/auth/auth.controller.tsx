import { useGoogleLogin } from '@react-oauth/google';
import { googleAuthentication } from './auth.service';
import { useSnackbar } from '../../context/SnackBar';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbar()
  const isAuthenticated = (): boolean => {
    const access_token = localStorage.getItem("access_token")

    if (!access_token) {
      console.error("[Token was not found]")
      return false
    }

    return true
  }

  const saveAccessToken = (token: string) => {
    if (!token) throw new Error("[TOken was not provided.]")
    localStorage.setItem("access_token", token)
    showSnackbar("Authentication Successfull", "success")
    navigate("/")
  }

  const googleLoginAuth = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      const data = await googleAuthentication(tokenResponse.code)
      if (data?.response?.data?.message) {
        showSnackbar(data.response.data.message, data.status == 400 ? "error" : "success")
        return
      }
      saveAccessToken(data.token)
      navigate("/")
    },
    onError: (err) => {
      console.error('Login Failed:', err);
    },
  });



  return { isAuthenticated, saveAccessToken, googleLoginAuth };
}
