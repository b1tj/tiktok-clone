import { SignInOption } from '@/components/Auth/SignInOption'
import { Button } from '@/components/Button'
import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

// const loginItems = [
//   {
//     id: 'qr_code',
//     Icon: QrCode,
//     title: 'Use QR code',
//   },
//   {
//     id: 'phone_email_username',
//     Icon: UserRound,
//     title: 'Use phone / email / username',
//   },
//   {
//     id: 'facebook',
//     Icon: Facebook,
//     title: 'Continue with Facebook',
//   },
//   {
//     id: 'google',
//     Icon: Google,
//     title: 'Continue with Google',
//   },
//   {
//     id: 'twitter',
//     Icon: Twitter,
//     title: 'Continue with Twitter',
//   },
//   {
//     id: 'line',
//     Icon: Line,
//     title: 'Continue with LINE',
//   },
//   {
//     id: 'kakaotalk',
//     Icon: KakaoTalk,
//     title: 'Continue with KakaoTalk',
//   },
//   {
//     id: 'apple',
//     Icon: Apple,
//     title: 'Continue with Apple',
//   },
// ]

type LoginModalProps = {
  isShow: boolean
  close: () => void
}

export function LoginModal({ isShow, close }: LoginModalProps) {
  const [render, setRender] = useState(isShow)
  const { user } = useAuthContext()

  const handleOnAnimationEnd = () => {
    if (!isShow) setRender(false)
  }

  useEffect(() => {
    if (isShow) setRender(true)
    if (user) setRender(false)
  }, [isShow, user])

  return (
    render && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div
          onAnimationEnd={handleOnAnimationEnd}
          className={`${
            isShow
              ? 'animate-fade-jump-out animate-duration-300'
              : 'animate-fade-jump-in animate-duration-200'
          } 
          relative  flex h-[642px]  w-[483px] items-center justify-center rounded-lg bg-white p-[64px_56px_0]`}
        >
          <Button
            intent="round"
            className="absolute right-[16px] top-[16px] h-[24px] w-[24px] scale-[1.7] bg-ghost p-0"
            onClick={close}
          >
            <X size={15} />
          </Button>
          <SignInOption />
        </div>
      </div>
    )
  )
}
