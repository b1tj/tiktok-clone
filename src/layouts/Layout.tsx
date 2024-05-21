import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '@/layouts/Header/Header'
import { Sidebar } from '@/layouts/Sidebar/Sidebar'
import { Snackbar } from '@/components/common/Snackbar'
import { LoginModal } from '@/components/LoginModal'

import { useSnackbarContext } from '@/contexts/Consumers/useSnackbarContext'
import { LoaderIndicator } from '@/components/common/LoaderIndicator'
import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { useAppSelector } from '@/hooks/reduxHooks'

export function Layout() {
  const isShow = useAppSelector((s) => s.modal.isShow)
  const { closeSnackbar, isShow: isSnackbarShow } = useSnackbarContext()
  const { loading } = useAuthContext()

  return (
    <>
      <div className={`${isShow ? 'w-[calc(100%-8px)]' : 'w-full'}`}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="mt-[60px] flex flex-1 flex-col items-center max-[767px]:ml-[16px]">
            <Suspense fallback={<LoaderIndicator />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>

      {isSnackbarShow && <Snackbar onAnimationEnd={closeSnackbar} />}
      {loading && <LoaderIndicator />}
      <LoginModal />
    </>
  )
}
