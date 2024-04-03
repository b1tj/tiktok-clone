import { useContext } from 'react'
import { LoginModalContext } from '@/contexts/Providers/LoginModalContext'

export function useLoginModalContext() {
  const context = useContext(LoginModalContext)

  if (context === null) {
    throw new Error('Cannot use outside of LoginModalProvider')
  }

  return context
}
