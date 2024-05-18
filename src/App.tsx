import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'
import { LoaderIndicator } from '@/components/common/LoaderIndicator'

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
        element: (
          <Suspense fallback={<LoaderIndicator />}>
            <HomePage />
          </Suspense>
        ),
      })),
      {
        path: '/following',
        element: (
          <Suspense fallback={<LoaderIndicator />}>
            <FollowingPage />
          </Suspense>
        ),
      },
      {
        path: '/friends',
        element: (
          <Suspense fallback={<LoaderIndicator />}>
            <FriendsPage />
          </Suspense>
        ),
      },
      {
        path: '/explore',
        element: (
          <Suspense fallback={<LoaderIndicator />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: '/live',
        element: (
          <Suspense fallback={<LoaderIndicator />}>
            <LivePage />
          </Suspense>
        ),
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<LoaderIndicator />}>
            <ProfilePage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: '/signup',
    element: (
      <Suspense fallback={<LoaderIndicator />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoaderIndicator />}>
        <SignInPage />
      </Suspense>
    ),
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
