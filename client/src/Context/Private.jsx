import { useEffect, useContext, useState } from "react"
import SimpleAlertContext from "./SimpleAlertContext"
import AuthContext from "./AuthContext"


const Private = () => {

  const [user, setuser] = useState('')
  const authCon = useContext(AuthContext)
  const { setisAuthenticated } = authCon
  const con = useContext(SimpleAlertContext)
  const { setAlertopen } = con
  useEffect(() => {

    const deploy = async () => {
      const res = await fetch('http://localhost:3000/pri', { credentials: "include" })
      const __data__ = await res.json()
      if (!__data__.open) {
        setisAuthenticated(__data__.auth)
        setuser(__data__.id)
      }
      else {
        setisAuthenticated(__data__.auth)
        setAlertopen((prev) => {
          return {
            ...prev,
            open: __data__.open,
            sev: __data__.sev,
            msg: __data__.msg
          }
        })
      }


    }
    deploy()


  }, [])
  return (
    <div className="flex bg-red-400 justify-center items-center h-[100vh] w-full">Private {user}</div>
  )
}

export default Private