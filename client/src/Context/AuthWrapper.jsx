import { useState } from "react";
import AuthContext from "./AuthContext";




const AuthWrapper = ({ children }) => {
    const [email, setemail] = useState('')
    function getCookieValue(cookieString, key) {
        const cookies = cookieString.split(';');
        for (let cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.trim().split('=');
            if (cookieKey === key) {
                return cookieValue;
            }
        }
        return null;
    }
    
    // Example usage
    const cookieString = document.cookie;
    const authValue = getCookieValue(cookieString, 'auth');
    console.log(authValue); // Outputs: true



    console.log("cookie is")
    console.log(document.cookie.auth)
    const [isAuthenticated, setisAuthenticated] = useState(()=>{
       return (authValue=="true")
    })
    return( <AuthContext.Provider value={{email,setemail,isAuthenticated,setisAuthenticated}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthWrapper