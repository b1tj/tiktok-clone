import { useLoggedInState } from '@/hooks/useLoggedInState'
import { Navigate } from 'react-router-dom'

export const FriendsPage = () => {
  const isUserLoggedIn = useLoggedInState()

  if (!isUserLoggedIn) {
    return <Navigate to="/" replace={true} />
  }
  return <div>FriendsPage</div>
}
