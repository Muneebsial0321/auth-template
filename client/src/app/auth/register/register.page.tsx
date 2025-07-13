import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../auth.controller";
import { AuthInputField } from "../auth.page";
import { useRegister } from "./register.controller";
import { Refresh } from "@mui/icons-material"

export default function RegisterPage() {
  const { registerData, onChange, onSubmit, isSubmitting } = useRegister()
  const { googleLoginAuth } = useAuth()

  return (
    <div className="flex flex-col bg-[radial-gradient(ellipse_at_center,#03172d_15%,#080e16_90%)] justify-center items-center h-[100vh]">

      {/* login from */}
      <div className="flex w-[25rem] flex-col gap-3 backdrop-blur-2xl border-[#333c4d] border bg-[#00000052] p-5 rounded-3xl ">
        <h2 className="text-3xl mb-4 text-center">Sign up</h2>
         {/* name Sign up */}
        <AuthInputField
          label="Name"
          name="name"
          value={registerData.name}
          onChange={onChange}
          placeholder="john doe"
        />

        {/* email */}
        <AuthInputField
          label="Email"
          name="email"
          value={registerData.email}
          onChange={onChange}
          placeholder="john@email.com"
        />

        {/* password */}
        <AuthInputField
          label="Password"
          name="password"
          value={registerData.password}
          onChange={onChange}
          placeholder="******"
        />


        {/* remember me */}
        <div className="flex gap-2">
          <input
            className="accent-blue-500"
            type="checkbox" /> Remember me
        </div>

        {/* button */}
        <Button
          onClick={() => !isSubmitting && onSubmit(registerData)}
          variant="contained"
          className="rounded-xl py-2 mt-2 bg-[#113c6b]"
        >Submit {isSubmitting && <Refresh className="animate-spin"/> } </Button>

        {/* or */}
        <div className="flex items-center gap-2">
          <hr className="flex-1 border-t border-gray-700" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-1 border-t border-gray-700" />
        </div>

        {/* google auth */}
        <Button
          onClick={() => googleLoginAuth()}
          variant="contained"
          className="rounded-xl py-2 mt-2 bg-[#0b0e14] border border-[#333c4d] normal-case"
        >
          <img
            className="size-5 mr-2"
            src="/google-logo.png" alt="" />
          Sign in with Google</Button>

        {/* no account */}
        <p className="text-base text-white text-center">Already have an Account?
          <Link to={"/auth/login"} className="hover:underline cursor-pointer" > login in</Link>
        </p>

        <h2 className="text-base text-center font-semibold">Powered by Tech <span className="text-blue-500">Tijarat</span></h2>

      </div>

    </div>
  )
}
