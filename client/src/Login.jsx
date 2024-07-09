import { Button, TextField } from '@mui/material'
import { useContext, useState,useEffect } from 'react'
// import _SimpleAlert_ from './SimpleAlert'
import SimpleAlertContext from './Context/SimpleAlertContext';
import AuthContext from './Context/AuthContext';


 const Login = () => {
    
    const [state, setstate] = useState([])
    const isAuth = useContext(AuthContext)
    const {setisAuthenticated } = isAuth
    

useEffect(() => {
    setAlertopen((prev)=>{
                  return {
                    ...prev,
                    open:false,
                    sev:"warning",
                    msg:"danger close"
                  }
                })

}, [])



    const con= useContext(SimpleAlertContext)
    const {setAlertopen} = con

const _NullCheck_=()=>{
  if(state.email==undefined || state.email==null || state.password==undefined ||state.password==null){
    setAlertopen((prev)=>{
    return { open:true,
      sev:"warning",
      msg:"Fields must not be empty"
    }})
    return false
  }
  else{
    return true
  }

}
  const __OnSubmit__= async()=>{
   if (_NullCheck_()){
    const req = await fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(state)
    })
    const data = await req.json()
    setAlertopen((prev) => {
      return {...prev,
        open:data.open,
        sev:data.sev,
        msg:data.msg

      }
    })
    setisAuthenticated(data.auth)

   }

  
  }

    const __OnChange__=(e)=>{
      
        setstate((prev)=>{ return{
            ...prev,
            [e.target.name]:e.target.value

        }})
    }
  return (
   <>
   {/* <_SimpleAlert_/> */}
    <div className="w-[100vw] bg-gray-100  h-[100vh] flex flex-col justify-center items-center gap-y-5">
   
   
   
   
    {/* email */}


        <TextField className=' w-[19rem]' label="Email" variant="outlined" type='email' name='email' placeholder='johndoe@email.com'  onChange={__OnChange__}/>
     

        {/* password */}
        <TextField className=' w-[19rem]' label="Password" variant="outlined" type='password' name='password' placeholder='*******'  onChange={__OnChange__}/>

        <Button onClick={__OnSubmit__} variant='filled'  className='w-[19rem] bg-blue-950 py-[.66rem] rounded-md text-white text-lg'>Submit</Button>
    </div>
   </>
  )
}

export default Login
