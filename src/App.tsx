import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useAppSelector } from '@/hooks/reduxHooks'

const ErrorPage = lazy(() =>
  import('@/pages/ErrorPage').then(({ ErrorPage }) => ({ default: ErrorPage })),
)

const Layout = lazy(() =>
  import('@/layouts/Layout').then(({ Layout }) => ({ default: Layout })),
)

const HomePage = lazy(() =>
  import('@/pages/HomePage').then(({ HomePage }) => ({ default: HomePage })),
)

const FollowingPage = lazy(() =>
  import('@/pages/FollowingPage').then(({ FollowingPage }) => ({
    default: FollowingPage,
  })),
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
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/en', element: <HomePage /> },
      { path: '/foryou', element: <HomePage /> },
      { path: '/following', element: <FollowingPage /> },
      { path: '/friends', element: <FriendsPage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/live', element: <LivePage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/login', element: <SignInPage /> },
])

export function App() {
  const isShow = useAppSelector((s) => s.modal.isShow)

  return (
    <div className={`${isShow ? 'h-screen overflow-y-hidden' : ''}`}>
      <RouterProvider router={router} />
    </div>
  )
}
