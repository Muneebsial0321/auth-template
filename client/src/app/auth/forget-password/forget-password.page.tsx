import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthInputField } from "../auth.page";
import { Refresh } from "@mui/icons-material";
import { useForgetPassword } from "./forget-password.controller";

export default function ForgetPasswordPage() {
  const {
    email,
    setEmail,
    isOtpSent,
    requestOtpEmail,
    verifyOtptoken,
    otpToken,
    setOtpToken,
    isSubmitting
  } = useForgetPassword()
  return (
    <div className="flex flex-col bg-[radial-gradient(ellipse_at_center,#03172d_15%,#080e16_90%)] justify-center items-center h-[100vh]">

      <div className="flex w-[25rem] flex-col gap-3 backdrop-blur-2xl border-[#333c4d] border bg-[#00000052] p-5 rounded-3xl">
        <h2 className="text-3xl mb-4 text-center">Forget Password</h2>

        <AuthInputField
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@email.com"
        />

        {isOtpSent && (
          <AuthInputField
            label="Enter OTP"
            name="otpToken"
            value={otpToken}
            onChange={(e) => setOtpToken(e.target.value)}
            placeholder="Enter OTP Token"
          />
        )}

        <Button
          onClick={() => {
            if (!isOtpSent) requestOtpEmail(email);
            else verifyOtptoken({ email, otpToken });
          }}
          variant="contained"
          className="rounded-xl py-2 mt-2 bg-[#113c6b]"
        >
          {isOtpSent ? "Verify OTP" : "Send OTP"}
          {isSubmitting && <Refresh className="animate-spin ml-2" />}
        </Button>

        <p className="text-base text-white text-center">
          Remember your password?
          <Link to={"/auth/login"} className="hover:underline cursor-pointer ml-1">Login</Link>
        </p>

        <h2 className="text-base text-center font-semibold">Powered by Tech <span className="text-blue-500">Tijarat</span></h2>
      </div>

    </div>
  );
}
