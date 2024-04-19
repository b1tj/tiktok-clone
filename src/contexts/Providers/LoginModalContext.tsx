import { createContext, ReactNode, useState } from 'react'

type LoginModalContextTypes = {
  isShow: boolean
  open: () => void
  close: () => void
}

type LoginModalProviderProps = {
  children: ReactNode
}

export const LoginModalContext = createContext<LoginModalContextTypes | null>(
  null,
)

export function LoginModalProvider({ children }: LoginModalProviderProps) {
  const [isShow, setIsShow] = useState(false)

  const open = () => {
    if (!isShow) setIsShow(true)
  }

  const close = () => {
    if (isShow) setIsShow(false)
  }

  return (
    <LoginModalContext.Provider value={{ isShow, open, close }}>
      {children}
    </LoginModalContext.Provider>
  )
}
