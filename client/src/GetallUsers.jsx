import  { useState,useContext } from 'react'
import { useEffect } from 'react'
import PrivatePageChecker from './Modules/privatePageChecker'
import SimpleAlertContext from "./Context/SimpleAlertContext"
import AuthContext from "./Context/AuthContext"

const GetallUsers = () => {
    
    const authCon = useContext(AuthContext)
    const { setisAuthenticated } = authCon
    const con = useContext(SimpleAlertContext)
    const { setAlertopen } = con
    
    const [_DATA_, set_DATA_] = useState([])

    useEffect(() => {
        const fun = async () => {
            
         const __data__ = await PrivatePageChecker('http://localhost:3000/pri')

          if (!__data__.open) {
          setisAuthenticated(__data__.auth)
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


            const res = await fetch('http://localhost:3000/user/getall')
            const _data_ = await res.json()
            set_DATA_(_data_)
        }
        fun()

            ;
    }, [])
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col items-center gap-y-4 pt-[5rem]'>
            <h1>Total Users are :&nbsp; {_DATA_.length}</h1>


            {/* mapping the users */}


            {_DATA_.map((e, i) => {
                return <div key={i} className="flex flex-col justify-around px-4 rounded-md border-[1px] border-gray-500 w-[30rem] py-3">

                    {/* name */}
                    <p className='font-semibold'>Name:&nbsp;&nbsp;{e.name}</p>
                    {/* email */}
                    <p>Email:&nbsp;&nbsp;{e.email}</p>
                </div>
            })

            }
        </div>
    )
}

export default GetallUsers