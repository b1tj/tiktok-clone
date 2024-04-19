export const routeConstants = Object.freeze({
  LOGIN: {
    id: 'login',
    name: 'Login',
    path: '/login',
    isProtected: true,
  },
  SIGNUP: {
    id: 'signup',
    name: 'SignUp',
    path: '/signup',
    isProtected: true,
  },
  HOME: {
    id: 'home',
    name: 'For You',
    path: '/',
  },
  FOLLOWING: {
    id: 'following',
    name: 'Following',
    path: '/following',
  },
  FRIENDS: {
    id: 'friends',
    name: 'Friends',
    path: '/friends',
    isProtected: true,
  },
  EXPLORE: {
    id: 'explore',
    name: 'Explore',
    path: '/explore',
  },
  LIVE: {
    id: 'live',
    name: 'LIVE',
    path: '/live',
  },
  PROFILE: {
    id: 'profile',
    name: 'Profile',
    path: '/profile',
    isProtected: true,
  },
})
