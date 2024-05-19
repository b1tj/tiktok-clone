import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'

const Layout = lazy(() =>
  import('@/layouts/Layout').then(({ Layout }) => ({ default: Layout })),
)

const HomePage = lazy(() =>
  import('@/pages/HomePage').then(({ HomePage }) => ({ default: HomePage })),
)

const FriendsPage = lazy(() =>
  import('@/pages/FriendsPage').then(({ FriendsPage }) => ({
    default: FriendsPage,
  })),
)

const ExplorePage = lazy(() =>
  import('@/pages/ExplorePage').then(({ ExplorePage }) => ({
    default: ExplorePage,
  })),
)

const LivePage = lazy(() =>
  import('@/pages/LivePage').then(({ LivePage }) => ({ default: LivePage })),
)

const ErrorPage = lazy(() =>
  import('@/pages/ErrorPage').then(({ ErrorPage }) => ({ default: ErrorPage })),
)

const FollowingPage = lazy(() =>
  import('@/pages/FollowingPage').then(({ FollowingPage }) => ({
    default: FollowingPage,
  })),
)

const ProfilePage = lazy(() =>
  import('@/pages/ProfilePage').then(({ ProfilePage }) => ({
    default: ProfilePage,
  })),
)

const SignUpPage = lazy(() =>
  import('@/pages/SignUpPage').then(({ SignUpPage }) => ({
    default: SignUpPage,
  })),
)
const SignInPage = lazy(() =>
  import('@/pages/SignInPage').then(({ SignInPage }) => ({
    default: SignInPage,
  })),
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...['/', '/en', '/foryou'].map((path) => ({
        path,
        element: <HomePage />,
      })),
      {
        path: '/following',
        element: <FollowingPage />,
      },
      {
        path: '/friends',
        element: <FriendsPage />,
      },
      {
        path: '/explore',
        element: <ExplorePage />,
      },
      {
        path: '/live',
        element: <LivePage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
])

export function App() {
  // Checking if current modal popup and prevent background scrolling
  const { isShow } = useLoginModalContext()

  return (
    <>
      <div className={`${isShow ? 'h-screen overflow-y-hidden' : ''}`}>
        <RouterProvider router={router} />
      </div>
    </>
  )
}
