import { useState } from 'react';
import { useSnackbar } from '../../../context/SnackBar';
import { postForgetPassword, postOtpVerification } from './forget-password.service';
import { useAuth } from '../auth.controller';

export function useForgetPassword() {
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { saveAccessToken } = useAuth()
  const { showSnackbar } = useSnackbar()

  const requestOtpEmail = async (email: string) => {
    setIsSubmitting(() => true)
    if (!email.trim() || !email.includes("@")) {
      showSnackbar("Please Provide a Valid Email")
      setIsSubmitting(() => false)
      return
    }
    const data = await postForgetPassword(email)
    setIsOtpSent(true)
    setIsSubmitting(() => false)
    console.log(data);

    if (data?.response?.data?.message) {
      showSnackbar(data.response.data.message, "error")
      setIsOtpSent(false)
      setIsSubmitting(() => false)
      return
    }
    showSnackbar(data.message, "success")
  }

  const verifyOtptoken = async (payload: { email: string, otpToken: string }) => {
    if (!payload.email) {
      showSnackbar("Email is Missing", "error")
      throw new Error("Email is Missing");
    }
    if (!payload.otpToken) {
      showSnackbar("Otp is Missing", "error")
      throw new Error("OTP is Missing");
    }

    setIsSubmitting(() => true)
    const data = await postOtpVerification({
      email: payload.email,
      otpToken: payload.otpToken
    })

    if (data?.response?.data?.message) {
      showSnackbar(data.response.data.message, "error")
      setIsOtpSent(false)
      setIsSubmitting(() => false)
      return
    }

    setIsSubmitting(() => false)
    saveAccessToken(data?.token)
  }


  return { verifyOtptoken, requestOtpEmail, isOtpSent, setEmail, email, otpToken, setOtpToken, isSubmitting };
}