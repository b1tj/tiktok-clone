import { createContext, useState, ReactNode } from 'react'

type LoginModalProviderProps = {
  children: ReactNode
}

type LoginModalContextType = {
  isShow: boolean
  open: () => void
  close: () => void
}

export const LoginModalContext = createContext<LoginModalContextType | null>(
  null,
)

export function LoginModalProvider({ children }: LoginModalProviderProps) {
  const [isShow, setIsShow] = useState(false)

  function open() {
    if (!isShow) {
      setIsShow(true)
    }
  }

  function close() {
    if (isShow) {
      setIsShow(false)
    }
  }

  return (
    <LoginModalContext.Provider value={{ isShow, open, close }}>
      {children}
    </LoginModalContext.Provider>
  )
}
