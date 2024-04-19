import { LoginModalContext } from '@/contexts/Providers/LoginModalContext'
import { useContext } from 'react'

export function useLoginModalContext() {
  const context = useContext(LoginModalContext)

  if (context === null) {
    throw new Error('Cannot use outside of LoginModalProvider')
  }

  return context
}
