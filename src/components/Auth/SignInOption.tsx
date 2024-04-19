import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { useSnackbarContext } from '@/contexts/Consumers/useSnackbarContext'
import { auth } from '@/firebase/firebase-config'
import { loginMethodConstants } from '@/shared/constants/items'
import { routeConstants } from '@/shared/constants/routes'
import { checkAuthPage } from '@/utils/checkAuthPage'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const { APPLE, FACEBOOK, GOOGLE, KAKAOTALK, LINE, QR_CODE, TWITTER, USERNAME } =
  loginMethodConstants

const { SIGNUP } = routeConstants

const loginMethods = [
  QR_CODE,
  USERNAME,
  FACEBOOK,
  GOOGLE,
  TWITTER,
  LINE,
  KAKAOTALK,
  APPLE,
]

export function SignInOption() {
  const location = useLocation()
  const navigation = useNavigate()
  const isAuthPage = checkAuthPage(location.pathname)
  const { setLoading, googleSignIn } = useAuthContext()
  const { openSnackbar } = useSnackbarContext()

  const handleLoginGoogle = async () => {
    setLoading(true)

    try {
      await googleSignIn()
      if (isAuthPage && auth.currentUser) {
        openSnackbar('Login Successfully')
        setTimeout(() => {
          navigation('/', { replace: true })
        }, 1000)
      } else if (!isAuthPage && auth.currentUser) {
        openSnackbar('Login Successfully')
        setTimeout(() => {
          navigation(0)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className={`${isAuthPage && 'flex h-[450px] w-screen justify-center overflow-y-scroll pt-[64px]'}`}
      >
        <div className={`w-[363px] ${isAuthPage ? 'h-[550px]' : ''}`}>
          <h2 className="mb-[16px] text-center text-[33px] font-bold tracking-tight text-text">
            Log in to TikTok
          </h2>

          {isAuthPage && (
            <div className="mb-[12px] px-4 text-center text-[15px] leading-5 text-text/40">
              Manage your account, check notifications, comment on videos, and
              more.
            </div>
          )}

          <div
            className={`p-[10px_5px_2px_13px] ${!isAuthPage ? 'h-[368px] overflow-y-scroll' : ''}`}
          >
            {loginMethods.map((item) => (
              <div
                key={item.title}
                className=" relative mb-[12px] flex h-[44px] w-full cursor-pointer 
                    items-center rounded-lg border border-ghost-border py-[12px] text-[20px]
                   hover:bg-ghost"
                onClick={
                  item.id === 'google'
                    ? () => {
                        handleLoginGoogle()
                      }
                    : () => {}
                }
              >
                <div className="absolute left-[12px]">
                  <item.Icon size={20} />
                </div>
                <p className="grow text-center text-[16px] font-medium">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isAuthPage && (
        <>
          <AuthAgreement />
          <SignUpNavigation />
        </>
      )}
    </div>
  )
}

export function AuthAgreement() {
  return (
    <div className="flex items-center justify-center p-[16px_30px]">
      <p className="w-[337px] text-center text-[12px] leading-[15px] text-text-fader">
        By continuing with an account located in{' '}
        <a href="#" className="font-semibold text-text opacity-75">
          {'Vietnam'}
        </a>
        , you agree to our{' '}
        <a href="#" className="font-medium text-text hover:underline">
          Terms of Service
        </a>{' '}
        and acknowledge that you have read our{' '}
        <a href="#" className="font-medium text-text hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}

export function SignUpNavigation() {
  const location = useLocation()
  const isAuthPage = checkAuthPage(location.pathname)

  return (
    <div
      className={`flex h-[66px] items-center justify-center border-t-[0.5px]
       border-t-ghost-border text-[15px] font-medium ${!isAuthPage ? 'w-[483px]' : 'w-full'}`}
    >
      <div className=" text-text">Don't have an account?</div>
      <Link to={SIGNUP.path} className="decoration-primary hover:underline">
        <span className="ml-[5px] text-primary">Sign up</span>
      </Link>
    </div>
  )
}
