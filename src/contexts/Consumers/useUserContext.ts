import { useContext } from 'react'
import { UserContext } from 'contexts/Providers/UserContext'

export function useUserContext() {
  const context = useContext(UserContext)

  if (context === null) {
    throw Error('Cannot use UserContext outside of its Provider')
  }

  return context
}
