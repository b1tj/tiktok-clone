import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedProps = {
  children: ReactNode
}

export function Protected({ children }: ProtectedProps) {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to="/" />
  }

  return children
}
