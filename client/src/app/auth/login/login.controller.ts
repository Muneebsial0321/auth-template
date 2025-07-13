import { useHandleSubmitProxy } from "../../../shared/ExecuteIfValid"
import { loginSchema, type LoginSchemaType } from "./login.schema"
import { loginUser } from "./login.service"
import { useAuth } from "../auth.controller"
import { useState } from "react"


export const useLogin = () => {
  const [loginData, setLoginData] = useState<LoginSchemaType>({
    email: "",
    password: ""
  })
  const { saveAccessToken } = useAuth()
  const { handleSubmit } = useHandleSubmitProxy()

  const onSubmit = async (payload: LoginSchemaType) => {
    const { data } = await handleSubmit(
      payload,
      loginSchema,
      loginUser,
      "Logged in",
      "success"
    )
    saveAccessToken(data.token)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  return { onSubmit, loginData ,setLoginData, onChange}
}

