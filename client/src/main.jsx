import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import AppProvider from "./context/AppProvider.tsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AppProvider>
  </StrictMode>
)
