import { SignInOption } from '@/components/Auth/SignInOption'

export function SignInPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-[60px] flex w-screen flex-col items-center">
        <SignInOption />
      </div>
    </div>
  )
}
