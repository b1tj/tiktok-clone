import { Button } from '@/components/Button'
import { LoginModal } from '@/components/LoginModal'

import campaignBg from '@/assets/imgs/campaign-background.png'

import { config } from '@/config'

import { NavLink, useLocation } from 'react-router-dom'

import { itemConstants } from '@/shared/constants/items'

import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'
import { useUserContext } from '@/contexts/Consumers/useUserContext'

const { HOME, EXPLORE, FOLLOWING, FRIENDS, LIVE, PROFILE } = itemConstants

const navItems = [HOME, FOLLOWING, FRIENDS, EXPLORE, LIVE, PROFILE]

const followingList: { id: string }[] = []

export function Sidebar() {
  const { isShow, open, close } = useLoginModalContext()
  const { user, loading } = useUserContext()
  const location = useLocation()

  return (
    <>
      {/* Big Sidebar */}
      <aside className="hidden w-[232px] flex-col pb-[26px] pl-[8px] pt-[20px] min-[1072px]:flex">
        <div className="fixed top-[80px] w-[240px]">
          <nav className="mb-[8px]">
            <ul>
              {navItems.map((navItem) => {
                let isActive = false
                if (navItem.id === 'home') {
                  isActive =
                    location.pathname === '/' ||
                    location.pathname === '/en' ||
                    location.pathname === '/foryou'
                } else {
                  isActive = location.pathname === navItem.path
                }

                const navLinkCssClasses = `h-[48px] cursor-pointer rounded-[4px] p-[8px] text-[18px] font-semibold
                  transition-[background] delay-0 duration-200 ease-in-out hover:bg-ghost 
                  ${isActive ? 'text-primary' : 'text-text'}`

                return (
                  <li key={navItem.id} className={navLinkCssClasses}>
                    <NavLink
                      to={navItem.path}
                      className="flex-start flex items-center gap-[8px]"
                    >
                      <navItem.Icon size={28} />
                      <span className="tracking-wide">{navItem.name}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div
            className="relative px-[8px] pb-[24px] pt-[20px] before:absolute before:left-[8px]
            before:right-[8px] before:top-0 before:h-[1px] before:scale-y-50
            before:bg-ghost-border before:content-['']"
          >
            {/* Conditional Render base on login state */}
            {!user ? (
              <>
                <p className="font-semibold text-text-fader">
                  Log in to follow creators, like videos, and view comments.
                </p>
                <Button
                  intent="primary"
                  size="medium"
                  className="mt-[20px] min-h-[48px] w-full rounded-[4px] py-[6px] text-center text-[18px]"
                  onClick={open}
                >
                  Login
                </Button>
              </>
            ) : !loading ? (
              <>
                <h2 className="text-[14px] font-bold text-text-fade">
                  Following accounts
                </h2>
                {followingList.length === 0 ? (
                  <p className="mt-[6px] text-[14px] font-semibold text-text-fader">
                    Accounts you follow will appear here
                  </p>
                ) : (
                  followingList.map((account) => (
                    <div key={account.id}>Account: {account.id}</div>
                  ))
                )}
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div
            className="relative pl-[8px] pr-[8px] pt-[16px]
             before:absolute before:left-[8px] before:right-[8px]
            before:top-0 before:h-[1px] before:scale-y-50 before:bg-ghost-border before:content-['']"
          >
            <a
              href={config.campaignURL}
              target="_blank"
              className="mb-[30px] block"
            >
              <div className="relative w-[208px]">
                <img
                  src={campaignBg}
                  alt="campaign image"
                  className="block h-[52px] select-none rounded-lg"
                />
                <div className="absolute top-1/2 flex translate-y-[-50%] items-center justify-center p-[0_10px] pl-[50px] text-start">
                  <h4 className="margin-0 text-[13px] font-bold leading-[16px] text-gold-fade">
                    Create TikTok effects, get a reward
                  </h4>
                </div>
              </div>
            </a>
            <span className="mt-[6px] text-[12px] font-bold leading-[16px] text-text-fader">
              © 2024 TikTok
            </span>
          </div>
        </div>
      </aside>

      {/* Small Sidebar */}
      <aside
        className="z-50 hidden h-screen w-[72px] shrink-0
        items-center  max-[1071px]:block"
      >
        <div
          className="fixed mt-[60px] h-full border-r border-r-ghost-border bg-white 
        p-[0_8px] pt-[12px] shadow-[0_2px_8px] shadow-ghost-border"
        >
          <nav>
            <ul className="flex flex-col gap-1">
              {navItems.map((navItem) => {
                let isActive = false
                if (navItem.id === 'home') {
                  isActive =
                    location.pathname === '/' ||
                    location.pathname === '/en' ||
                    location.pathname === '/foryou'
                } else {
                  isActive = location.pathname === navItem.path
                }

                const navLinkCssClasses = `h-[48px] cursor-pointer rounded-[4px] p-[12px_16px] text-[18px] font-semibold
                  transition-[background] delay-0 duration-200 ease-in-out hover:bg-ghost 
                  ${isActive ? 'text-primary' : 'text-text'}`

                return (
                  <li key={navItem.id} className={navLinkCssClasses}>
                    <NavLink
                      to={navItem.path}
                      className="flex-start flex items-center justify-center gap-[8px]"
                    >
                      <navItem.Icon size={24} />
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <LoginModal show={isShow} close={close} />
    </>
  )
}
