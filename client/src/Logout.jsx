import { Button } from '@mui/material'
import React, { useContext } from 'react'
import AuthContext from './Context/AuthContext'

const Logout = () => {
    const authCon = useContext(AuthContext)
    const {setisAuthenticated} = authCon

    const logout=()=>{
        document.cookie="auth"+"="+"false"+"; path=/"
        window.location.reload()
    }
  return (
    <div className='flex flex-col h-[80vh] justify-center items-center gap-y-6'>
        <h1 className='text-6xl'>Wanna Logout</h1>
        <Button
        onClick={logout}
         variant='contained'
         color='error'
         className='text-3xl w-[15rem] py-4'>Log Out</Button>
    </div>
  )
}

export default Logout