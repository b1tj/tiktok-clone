import { createContext, ReactNode, useState } from 'react'

type SnackbarContextTypes = {
  isShow: boolean
  openSnackbar: (message: string) => void
  closeSnackbar: () => void
  snackBarMessage: string
}

type SnackbarProviderProps = {
  children: ReactNode
}

export const SnackbarContext = createContext<SnackbarContextTypes | null>(null)

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [isShow, setIsShow] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')

  const openSnackbar = (message: string) => {
    setSnackBarMessage(message)
    if (!isShow) setIsShow(true)
  }

  const closeSnackbar = () => {
    if (isShow) setIsShow(false)
  }

  return (
    <SnackbarContext.Provider
      value={{ isShow, openSnackbar, closeSnackbar, snackBarMessage }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}
