import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import { SiginUp } from "./SiginUp"
import Nav from './Nav'
import GetallUsers from "./GetallUsers.jsx"
import Private from "./Context/Private.jsx"
import { useContext } from "react"
import AuthContext from "./Context/AuthContext.jsx"
import { NotFoundPage } from "./NotFoundPage.jsx"
import _SimpleAlert_ from './SimpleAlert'
import Logout from "./Logout.jsx"






export default function App() {
  const con = useContext(AuthContext)
  const {isAuthenticated } = con
  console.log("app " ,isAuthenticated)
  return( 
  <>
  <Nav/>
  <_SimpleAlert_/>
<Routes>
  <Route path="/home" element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/getAllUsers" element={isAuthenticated ? <GetallUsers/>:<NotFoundPage/>} />
  <Route path="/pri" element={isAuthenticated ?<Private/>:<NotFoundPage/>} />
  <Route path="/logout" element={isAuthenticated ?<Logout/>:<NotFoundPage/>} />
  <Route path="/sign" element={<SiginUp/>} />
</Routes>

  </>)
    }

