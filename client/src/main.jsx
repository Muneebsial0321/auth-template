import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter as BrowserRouter } from 'react-router-dom'
import SimpleAlert from './Context/SimpleAlert.jsx'
import AuthWrapper from "./Context/AuthWrapper.jsx"




ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
<SimpleAlert>
<AuthWrapper>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthWrapper>
</SimpleAlert>

  
  </React.StrictMode>,
)
