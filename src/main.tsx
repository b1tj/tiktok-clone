import { App } from '@/App'
import { AuthContextProvider } from '@/contexts/Providers/AuthContext'
import { SnackbarProvider } from '@/contexts/Providers/SnackbarContext'
import '@/index.css'
import { StyledEngineProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from '@/services/store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <SnackbarProvider>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </SnackbarProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
)
