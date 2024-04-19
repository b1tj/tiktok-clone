import { Button } from '@/components/Button'
import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'
import { useLoggedInState } from '@/hooks/useLoggedInState'
import { dropDownItemConstants } from '@/shared/constants/items'
import Tippy, { TippyProps } from '@tippyjs/react'
import { ChevronLeft, LucideIcon } from 'lucide-react'
import { ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

const {
  VIEW_PROFILE,
  DARK_MODE,
  FAVORITES,
  FEEDBACK_AND_HELP,
  GET_COIN,
  KEYBOARD_SHORTCUTS,
  LANGUAGES,
  LIVE_CREATOR_HUB,
  LIVE_STUDIO,
  LOGOUT,
  SETTINGS,
} = dropDownItemConstants

type DropdownItemType = {
  id: string
  label: string
  Icon: LucideIcon
  children?: { id: string; label: string }[]
}

const guestItems: DropdownItemType[] = [
  LIVE_CREATOR_HUB,
  LANGUAGES,
  FEEDBACK_AND_HELP,
  KEYBOARD_SHORTCUTS,
  DARK_MODE,
]

const loggedInItems: DropdownItemType[] = [
  VIEW_PROFILE,
  FAVORITES,
  GET_COIN,
  LIVE_STUDIO,
  LIVE_CREATOR_HUB,
  SETTINGS,
  LANGUAGES,
  FEEDBACK_AND_HELP,
  KEYBOARD_SHORTCUTS,
  DARK_MODE,
  LOGOUT,
]

const tippyConfig: TippyProps = {
  interactive: true,
  theme: 'light',
  animation: 'fade',
  duration: [0, 700],
  delay: [0, 400],
  offset: [-100, 15],
  hideOnClick: false,
}

type DropdownProps = {
  children: ReactElement
}

export function Dropdown({ children }: DropdownProps) {
  const [selected, setSelected] = useState<number>(-1)
  const [isLogoutPopupShow, setIsLogoutPopupShow] = useState(false)
  const isUserLoggedIn = useLoggedInState()
  const items = isUserLoggedIn ? loggedInItems : guestItems

  const handleLogoutModalClose = () => {
    setIsLogoutPopupShow(false)
  }

  const handleSingleItemOnClick = (
    item: DropdownItemType,
    itemIndex: number,
  ) => {
    setSelected(itemIndex)

    if (item.id === 'logout') {
      return !isLogoutPopupShow && setIsLogoutPopupShow(true)
    }
  }

  const handleClose = () => {
    setSelected(-1)
  }

  return (
    <>
      {selected < 0 || items[selected]?.children === undefined ? (
        <Tippy
          className="overflow-hidden rounded-lg"
          content={
            <ul
              className="-mx-[9px] -my-[5px] flex min-w-[223px] flex-col
                bg-white py-2 text-[16px] font-semibold leading-[21px] shadow-[0_4px_16px_0_rgba(0,0,0,0.02)] "
            >
              {items.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => handleSingleItemOnClick(item, index)}
                  className="flex h-[41px] w-full shrink-0 items-center gap-2 
                      whitespace-nowrap py-[10px] pl-4 pr-2 hover:bg-ghost"
                >
                  <item.Icon />
                  <span>{item.label}</span>
                  {item.id === 'dark_mode' && <Switch />}
                </li>
              ))}
            </ul>
          }
          {...tippyConfig}
          onHidden={() => setSelected(-1)}
        >
          {children}
        </Tippy>
      ) : (
        <Tippy
          className="overflow-hidden rounded-lg"
          content={
            <div className="m-0 -mx-[9px] -my-[5px] min-w-[223px] bg-white">
              <header className="relative flex h-[50px] items-center">
                <ChevronLeft className=" ml-5" onClick={() => handleClose()} />
                <p className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold leading-[21px]">
                  Language
                </p>
              </header>
              <ul>
                {items[selected]?.children?.map((item) => (
                  <li
                    key={item.id}
                    className="px-[24px] py-[10px] text-[14px] font-semibold leading-[14px] hover:bg-ghost"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          }
          {...tippyConfig}
          onHidden={() => setSelected(-1)}
        >
          {children}
        </Tippy>
      )}

      <LogoutPopup isShow={isLogoutPopupShow} close={handleLogoutModalClose} />
    </>
  )
}

function Switch() {
  return (
    <label className="relative ml-8 cursor-pointer">
      <input className="peer sr-only" value="" type="checkbox" />
      <div
        className="peer h-[24px] w-[44px] rounded-full bg-[#1618231f] 
        outline-none duration-100 after:absolute after:left-[2px] after:top-[2px] after:flex after:h-[20px] 
        after:w-[20px] after:items-center after:justify-center after:rounded-full after:bg-white  after:font-bold
      after:text-sky-800 after:outline-none after:duration-500 hover:bg-[#16182329] peer-checked:bg-[#0be09b]
        peer-checked:after:translate-x-[20px] peer-checked:after:border-white peer-focus:outline-none"
      ></div>
    </label>
  )
}

type LogoutPopupProps = {
  close: () => void
  isShow: boolean
}

function LogoutPopup({ close, isShow }: LogoutPopupProps) {
  const [render, setRender] = useState(isShow)
  const { close: closeLoginModal } = useLoginModalContext()
  const { signOutUser } = useAuthContext()
  const navigate = useNavigate()

  const handleOnAnimationEnd = () => {
    if (!isShow) setRender(false)
  }

  const handleLogout = () => {
    try {
      signOutUser()
      close()
      closeLoginModal()
      setTimeout(() => {
        navigate(0)
      }, 1000000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isShow) setRender(true)
  }, [isShow])

  return (
    render && (
      <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div
          onAnimationEnd={handleOnAnimationEnd}
          className={`${
            isShow
              ? 'animate-fade-jump-out animate-duration-300'
              : 'animate-fade-jump-in animate-duration-200'
          } 
          flex w-[400px] flex-col items-center rounded-lg bg-white p-[32px]`}
        >
          <div className="w-full p-[0_32px] text-center text-2xl font-bold text-text">
            Are you sure you want to log out?
          </div>
          <div className="mt-[16px] flex w-[336px] justify-between">
            <Button
              intent="ghost"
              size="unset"
              className="flex h-[48px] min-h-[28px] w-[164px] min-w-[106px] 
              select-none justify-center rounded-[4px] p-[0_10px] text-[16px] font-medium leading-[22px]"
              onClick={close}
            >
              Cancel
            </Button>

            <Button
              intent="primary"
              size="unset"
              className="h-[48px] min-h-[28px] w-[164px] min-w-[106px] select-none 
              rounded-[4px] p-[0_10px] text-[16px] font-medium leading-[22px]"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
