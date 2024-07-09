import { Button,  TextField } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import _SimpleAlert_ from './SimpleAlert'
import SimpleAlertContext from './Context/SimpleAlertContext';
import AuthContext from './Context/AuthContext';

export const SiginUp = () => {

  const isAuth = useContext(AuthContext)
  const { isAuthenticated, setisAuthenticated } = isAuth
  console.log(isAuthenticated)

  const [state, setstate] = useState({})
  const [checkPassword, setCheckPassword] = useState('')
  const OnCheckPasswordChange = (e) => { setCheckPassword(e.target.value) }

  useEffect(() => {
    setAlertopen((prev) => {
      return {
        ...prev,
        open: false,
        sev: "warning",
        msg: "danger close"
      }
    })

  }, [])



  const con = useContext(SimpleAlertContext)
  const { isAlertopen, setAlertopen } = con

  const __OnChange__ = (e) => {
    setstate((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value

      }
    })
  }
  const __Submit__ = async () => {
    if (state.password == checkPassword) {
      const req = await fetch('http://localhost:3000/user/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(state)
      })
      const data = await req.json()
      console.log(data)
      setAlertopen((prev) => {
        return {...prev,
          open:data.open,
          sev:data.sev,
          msg:data.msg

        }
      })
      setisAuthenticated(data.auth)

console.log("alert is")
console.log(isAlertopen)

    }

  }
  return (
    <>
      <_SimpleAlert_ />
      <div className="w-[100vw] bg-gray-100  h-[100vh] flex flex-col justify-center items-center gap-y-5">
        {/* Name */}


        <TextField className=' w-[19rem]' label="Name" variant="outlined" type='text' name='name' placeholder='John doe' onChange={__OnChange__} />
        {/* email */}


        <TextField className=' w-[19rem]' label="Email" variant="outlined" type='email' name='email' placeholder='johndoe@email.com' onChange={__OnChange__} />
        {/* password */}


        <TextField className=' w-[19rem]' label="Password" variant="outlined" type='password' name='password' placeholder='*******' onChange={__OnChange__} />
        {/* password */}


        <TextField className=' w-[19rem]' label="Check Password" variant="outlined" type='email' name='cpassword' placeholder='********' value={checkPassword} onChange={OnCheckPasswordChange} />

        <Button onClick={__Submit__} variant='filled' className='w-[19rem] bg-blue-950 py-[.66rem] rounded-md text-white text-lg'>Submit</Button>
      </div>
    </>
  )
}
