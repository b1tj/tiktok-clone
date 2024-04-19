import { routeConstants } from '@/shared/constants/routes'
import { Pathname } from 'react-router-dom'

// type checkAuthPageTypes = {
//   path: Pathname
// }

const { LOGIN, SIGNUP } = routeConstants

export function checkAuthPage(path: Pathname) {
  return path === LOGIN.path || path === SIGNUP.path
}
