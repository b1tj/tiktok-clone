import fallbackImage from '@/assets/imgs/no-image.png'
import logo from '@/assets/imgs/tiktok-logo.png'
import { Button } from '@/components/common/Button'
import { Dropdown } from '@/components/Dropdown'
import { SearchResult } from '@/components/SearchResult'
import { config } from '@/config'
import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'
import { useLoggedInState } from '@/hooks/useLoggedInState'
import { routeConstants } from '@/shared/constants/routes'
import Tippy, { TippyProps } from '@tippyjs/react/'
import {
  Bell,
  CircleHelp,
  EllipsisVertical,
  Plus,
  Search,
  Send,
} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'

const tippyConfig: TippyProps = {
  interactive: false,
  arrow: true,
}

const { LOGIN, SIGNUP } = routeConstants

export function Header() {
  const [isShowResult, setIsShowResult] = useState(false)
  const { isShow, open } = useLoginModalContext()
  const { user } = useAuthContext()
  const isUserLoggedIn = useLoggedInState()
  const location = useLocation()

  const openResult = () => setIsShowResult(true)
  const closeResult = () => setIsShowResult(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div
      className={`fixed top-0 z-[999] flex h-[60px] items-center
      justify-between bg-white pl-4 pr-6 shadow-[0px_1px_1px_#0000001f]
      ${isShow ? 'w-[calc(100%-8px)]' : 'w-full'}`}
    >
      <div className="flex min-w-[300px] items-center max-[768px]:min-w-fit">
        <a href={config.websiteURL} className="block w-fit">
          <img src={logo} alt="TopTop" className="h-10 flex-shrink-0" />
        </a>
      </div>

      {location.pathname !== LOGIN.path && location.pathname !== SIGNUP.path ? (
        <>
          {/* Search */}
          <div className="relative flex w-[516px] min-w-[200px] px-[8px] max-[780px]:hidden">
            <SearchResult visible={isShowResult} close={closeResult}>
              <form
                className="group flex w-[500px] min-w-[200px] items-center overflow-hidden
                  rounded-full border border-transparent bg-input px-4 py-2 focus-within:border 
                  focus-within:border-[#1618231f] hover:border hover:border-[#1618231f]"
                onSubmit={handleSubmit}
              >
                <input
                  onClick={openResult}
                  type="text"
                  placeholder="Search"
                  className=" w-full flex-grow bg-transparent text-[16px] font-semibold caret-primary outline-none"
                />
                <span className="h-[28px] w-[1px] bg-[#1618231f]"></span>
                <Button
                  className="-my-3 -mr-4 flex shrink-0 cursor-pointer items-center border-none py-6 pl-3 pr-4 outline-none group-hover:bg-input"
                  intent="icon"
                >
                  <Search
                    className="opacity-40 group-hover:opacity-100"
                    strokeWidth={2.5}
                    size={20}
                  />
                </Button>
              </form>
            </SearchResult>
          </div>

          <div className="ml-4 flex items-center gap-4">
            <a href="#">
              <Button intent="ghost">
                <Plus size={20} strokeWidth={2} />
                <span className="font-medium">Upload</span>
              </Button>
            </a>
            {!isUserLoggedIn && (
              <Button intent="fill" className="min-w-[100px]" onClick={open}>
                Log in
              </Button>
            )}
            <div className="cursor-pointer">
              {isUserLoggedIn ? (
                <div className="ml-[12px] flex items-center gap-6">
                  <Tippy
                    className="focus:ring-none overflow-hidden rounded-lg border-none text-[16px] leading-[21px] text-white focus:outline-transparent"
                    content={
                      <div className="!border-none p-1 text-[16px] font-semibold leading-[21px] text-white !outline-none focus:!ring-0 focus:!ring-red-700">
                        Message
                      </div>
                    }
                    {...tippyConfig}
                  >
                    <Send />
                  </Tippy>
                  <Tippy
                    className="focus:ring-none overflow-hidden rounded-lg border-none p-0 text-[16px] leading-[21px] text-white focus:outline-transparent "
                    content={
                      <div className="!border-none p-1 text-[16px] font-semibold leading-[21px] text-white !outline-none focus:!ring-0 focus:!ring-red-700">
                        Inbox
                      </div>
                    }
                    {...tippyConfig}
                  >
                    <Bell />
                  </Tippy>
                  <Dropdown>
                    <div className="h-[32px] w-[32px] overflow-hidden rounded-full bg-ghost">
                      <img
                        src={user?.photoURL ?? fallbackImage}
                        className="h-full w-full border-none object-cover"
                        alt=""
                      />
                    </div>
                  </Dropdown>
                </div>
              ) : (
                <Dropdown>
                  <div>
                    <EllipsisVertical />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-[8px]">
          <CircleHelp size={20} className="shrink-0 text-text-fader" />
          <a
            href="/feedback"
            className="text-[14px] font-semibold leading-[20px] tracking-wide text-[#161823] hover:underline"
          >
            Feedback and help
          </a>
        </div>
      )}
    </div>
  )
}
