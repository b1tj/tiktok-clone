import { useContext } from 'react'
import { AuthContext } from 'contexts/Providers/AuthContext'

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw Error('Cannot use AuthContext outside of its provider')
  }

  return context
}
