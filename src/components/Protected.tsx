import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'
import { ReactNode, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedProps = {
  children: ReactNode
}

export function Protected({ children }: ProtectedProps) {
  const { user } = useAuthContext()
  const openRef = useRef(useLoginModalContext().open)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
      openRef.current()
    }
  }, [user, navigate])

  return children
}
