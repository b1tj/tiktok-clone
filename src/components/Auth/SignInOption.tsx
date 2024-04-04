import {
  Apple,
  Facebook,
  Google,
  KakaoTalk,
  Line,
  QrCode,
  Twitter,
} from '@/assets/icons/icons'
import { UserRound } from 'lucide-react'

const loginItems = [
  {
    id: 'qr_code',
    Icon: QrCode,
    title: 'Use QR code',
  },
  {
    id: 'phone_email_username',
    Icon: UserRound,
    title: 'Use phone / email / username',
  },
  {
    id: 'facebook',
    Icon: Facebook,
    title: 'Continue with Facebook',
  },
  {
    id: 'google',
    Icon: Google,
    title: 'Continue with Google',
  },
  {
    id: 'twitter',
    Icon: Twitter,
    title: 'Continue with Twitter',
  },
  {
    id: 'line',
    Icon: Line,
    title: 'Continue with LINE',
  },
  {
    id: 'kakaotalk',
    Icon: KakaoTalk,
    title: 'Continue with KakaoTalk',
  },
  {
    id: 'apple',
    Icon: Apple,
    title: 'Continue with Apple',
  },
]

export function SignInOption() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[363px]">
        <h2 className="mb-[16px] text-center text-[33px] font-bold tracking-tight text-text">
          Log in to TikTok
        </h2>

        <div className="h-[368px] overflow-y-scroll p-[10px_5px_2px_13px]">
          {loginItems.map((item) => (
            <div
              key={item.title}
              className=" relative mb-[12px] flex h-[44px] w-full cursor-pointer 
                  items-center rounded-lg border border-ghost-border py-[12px] text-[20px]
                 hover:bg-ghost"
              onClick={
                item.id === 'google'
                  ? () => {
                      // handleLoginGoogle()
                    }
                  : () => {}
              }
            >
              <div className="absolute left-[12px]">
                <item.Icon size={20} />
              </div>
              <p className="grow text-center text-[16px] font-semibold">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-[16px_30px]">
        <p className="w-[337px] text-center text-[12px] leading-[15px] text-text-fader">
          By continuing with an account located in{' '}
          <a href="#" className="font-bold text-text opacity-75">
            {'Vietnam'}
          </a>
          , you agree to our{' '}
          <a href="#" className="font-semibold text-text hover:underline">
            Terms of Service
          </a>{' '}
          and acknowledge that you have read our{' '}
          <a href="#" className="font-semibold text-text hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <hr />
      <div className="flex h-[66px] w-[483px] items-center justify-center border-t-[0.5px] border-t-ghost-border text-[15px]">
        <div className="font-semibold text-text">Don't have an account?</div>
        <a href="#" className="decoration-primary hover:underline">
          <span className="ml-[5px] font-semibold text-primary">Sign up</span>
        </a>
      </div>
    </div>
  )
}
