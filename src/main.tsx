import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/App.tsx'
import '@/index.css'

import { LoginModalProvider } from '@/contexts/Providers/LoginModalContext.tsx'
import { UserContextProvider } from '@/contexts/Providers/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <LoginModalProvider>
        <App />
      </LoginModalProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
