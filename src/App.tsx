import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from '@/pages/ErrorPage.tsx'
import { FollowingPage } from '@/pages/FollowingPage.tsx'
import { FriendsPage } from '@/pages/FriendsPage.tsx'
import { ExplorePage } from '@/pages/ExplorePage.tsx'
import { LivePage } from '@/pages/LivePage.tsx'
import { ProfilePage } from '@/pages/ProfilePage.tsx'
import { HomePage } from '@/pages/HomePage.tsx'
import { Layout } from '@/layouts/Layout.tsx'

import { LoginModalProvider } from '@/contexts/Providers/LoginModalContext.tsx'
import { UserContextProvider } from '@/contexts/Providers/UserContext.tsx'
import { SignUp } from '@/components/Auth/SignUp.tsx'
import { SignIn } from '@/components/Auth/SignIn.tsx'

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
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
])

export function App() {
  return (
    <UserContextProvider>
      <LoginModalProvider>
        <RouterProvider router={router} />
      </LoginModalProvider>
    </UserContextProvider>
  )
}
