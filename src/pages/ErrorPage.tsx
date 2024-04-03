import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Header } from '@/layouts/Header'

export function ErrorPage() {
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <div className="m-auto flex w-full flex-col items-center justify-center gap-10 ">
      <Header />
      <h1 className="text-[36px] font-bold">Oops!</h1>
      <p className="text-[18px] font-semibold">
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}
