import { App } from '@/App'
import { AuthContextProvider } from '@/contexts/Providers/AuthContext'
import { LoginModalProvider } from '@/contexts/Providers/LoginModalContext.tsx'
import { SnackbarProvider } from '@/contexts/Providers/SnackbarContext'
import '@/index.css'
import { StyledEngineProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <LoginModalProvider>
        <SnackbarProvider>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </SnackbarProvider>
      </LoginModalProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
