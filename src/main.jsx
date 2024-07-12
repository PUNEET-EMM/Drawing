import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import { ProjectProvider } from './context/ProjectContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <UserProvider>
  <ProjectProvider>
    <App />
    </ProjectProvider>
    </UserProvider>
  </React.StrictMode>,
)
