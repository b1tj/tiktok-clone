import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorPage } from '@/pages/ErrorPage.tsx'
import { FollowingPage } from '@/pages/FollowingPage.tsx'
import { FriendsPage } from '@/pages/FriendsPage.tsx'
import { ExplorePage } from '@/pages/ExplorePage.tsx'
import { LivePage } from '@/pages/LivePage.tsx'
import { ProfilePage } from '@/pages/ProfilePage.tsx'
import { HomePage } from '@/pages/HomePage.tsx'
import { Layout } from '@/layouts/Layout.tsx'

import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'

import { SignUpPage } from '@/pages/SignUpPage'
import { SignInPage } from '@/pages/SignInPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/en',
        element: <HomePage />,
      },
      {
        path: '/foryou',
        element: <HomePage />,
      },
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
