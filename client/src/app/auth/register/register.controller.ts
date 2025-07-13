import { useState } from "react"
import { useHandleSubmitProxy } from "../../../shared/ExecuteIfValid"
import { useAuth } from "../auth.controller"
import { registerSchema, type RegisterSchemaType } from "./register.schema"
import { registerUser } from "./register.service"


export const useRegister = () => {
    const [registerData, setRegisterData] = useState<RegisterSchemaType>({
      name: "",
      email: "",
      password: ""
    })
  const { handleSubmit } = useHandleSubmitProxy()
  const { saveAccessToken } = useAuth()

  const onSubmit = async (payload: RegisterSchemaType) => {
    const { data } = await handleSubmit(
      payload,
      registerSchema,
      registerUser,
      "Registered",
      "success"
    )
    saveAccessToken(data.token)
    
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  return { onSubmit, registerData ,setRegisterData, onChange}
}
