import { Outlet } from 'react-router-dom'
import { Header } from 'layouts/Header'
import { Sidebar } from 'layouts/Sidebar'

export function Layout() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex flex-1 flex-col items-center">
          <Outlet />
        </main>
      </div>
    </>
  )
}
