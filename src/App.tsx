import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { useAppSelector } from '@/hooks/reduxHooks'

const ErrorPage = lazy(() =>
  import('@/pages/ErrorPage').then(({ ErrorPage }) => ({ default: ErrorPage })),
)
const router = createBrowserRouter([
  {
    async lazy() {
      const { Layout } = await import('@/layouts/Layout')
      return { Component: Layout }
    },
    errorElement: <ErrorPage />,
    children: [
      ...['/', '/en', '/foryou'].map((path) => ({
        path,
        async lazy() {
          const { HomePage } = await import('@/pages/HomePage')
          return { Component: HomePage }
        },
      })),
      {
        path: '/following',
        async lazy() {
          const { FollowingPage } = await import('@/pages/FollowingPage')
          return { Component: FollowingPage }
        },
      },
      {
        path: '/friends',
        async lazy() {
          const { FriendsPage } = await import('@/pages/FriendsPage')
          return { Component: FriendsPage }
        },
      },
      {
        path: '/explore',
        async lazy() {
          const { ExplorePage } = await import('@/pages/ExplorePage')
          return { Component: ExplorePage }
        },
      },
      {
        path: '/live',
        async lazy() {
          const { LivePage } = await import('@/pages/LivePage')
          return { Component: LivePage }
        },
      },
      {
        path: '/profile',
        async lazy() {
          const { ProfilePage } = await import('@/pages/ProfilePage')
          return { Component: ProfilePage }
        },
      },
    ],
  },

  {
    path: '/signup',
    async lazy() {
      const { SignUpPage } = await import('@/pages/SignUpPage')
      return { Component: SignUpPage }
    },
  },
  {
    path: '/login',
    async lazy() {
      const { SignInPage } = await import('@/pages/SignInPage')
      return { Component: SignInPage }
    },
  },
])

export function App() {
  // Checking if current modal popup and prevent background scrolling
  const isShow = useAppSelector((s) => s.modal.isShow)

  return (
    <>
      <div className={`${isShow ? 'h-screen overflow-y-hidden' : ''}`}>
        <RouterProvider router={router} />
      </div>
    </>
  )
}
