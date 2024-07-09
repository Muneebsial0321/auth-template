import  {useState} from 'react'
import SimpleAlertContext from './SimpleAlertContext'
const SimpleAlert = ({children}) => {
   
    const[isAlertopen,setAlertopen] = useState(()=>{return{
        // open:false,
        // sev:"error",
        // msg:"error"
    }})
  return (
    <SimpleAlertContext.Provider value={{isAlertopen,setAlertopen}}>
        {children}
    </SimpleAlertContext.Provider>
    
  )
}

export default SimpleAlert