import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { userProfileTabItems } from '@/shared/constants/items'
import { FilePenLine, Forward } from 'lucide-react'
import { useLoggedInState } from '@/hooks/useLoggedInState'
import axios from 'axios'
import { Player } from '@/components/Player'

import { PlayerType } from '@/shared/types/types'

const { VIDEOS, FAVORITES, LIKED } = userProfileTabItems

const tabItems = [VIDEOS, FAVORITES, LIKED]

export const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState(tabItems.indexOf(VIDEOS))
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)
  const [hoveringTab, setHoveringTab] = useState(-1)
  const [data, setData] = useState<PlayerType[]>([])
  const { user } = useAuthContext()

  const isUserLoggedIn = useLoggedInState()

  const tabsRef = useRef<HTMLParagraphElement[] | null>([])

  useEffect(() => {
    const setTabPosition = () => {
      const onHoveringTab = tabsRef.current![hoveringTab]
      setTabUnderlineLeft(onHoveringTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(onHoveringTab?.clientWidth ?? 0)
    }

    setTabPosition()
  }, [currentTab, hoveringTab])

  useEffect(() => {
    const setInitialTab = () => {
      const currentActiveTab = tabsRef.current![tabItems.indexOf(VIDEOS)]
      setTabUnderlineLeft(currentActiveTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(currentActiveTab?.clientWidth ?? 0)
    }

    setInitialTab()
  }, [])

  useEffect(() => {
    const fetchData = () => {
      axios
        .get<PlayerType[]>(
          'https://jsonplaceholder.typicode.com/albums/1/photos',
        )
        .then((res) => setData(res.data))
        .catch((error) => console.log(error))
    }

    fetchData()
  }, [currentTab])

  if (!isUserLoggedIn) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className="flex h-full w-full flex-col px-4 py-5">
      <section className="relative max-w-[624px]">
        <div className=" mb-5  pr-24">
          <div className="flex gap-5">
            <div className="size-[116px] overflow-hidden rounded-full">
              <img
                src={user?.photoURL ?? undefined}
                alt={user?.displayName ?? ''}
                className="size-full"
              />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold">{user?.displayName}</h1>
              <h2 className="text-lg font-medium">{user?.uid}</h2>
              <Button intent="ghost" className="mt-4 rounded-[0.25rem]">
                <FilePenLine size={20} strokeWidth={2} />
                <span className="font-medium">Edit Profile</span>
              </Button>
            </div>
          </div>
          <section className="mt-4 flex gap-5">
            <div className="cursor-pointer space-x-2">
              <strong className="text-lg">0</strong>
              <span className="text-[16px] hover:underline ">Following</span>
            </div>
            <div className="cursor-pointer space-x-2">
              <strong className="text-lg">0</strong>
              <span className="text-[16px] hover:underline ">Followers</span>
            </div>
            <div className="space-x-2">
              <strong className="text-lg">0</strong>
              <span className="text-[16px]">Likes</span>
            </div>
          </section>
          <h2 className="mt-3">No bio yet.</h2>
          <Forward
            className="absolute right-2 top-2 cursor-pointer"
            size={28}
          />
        </div>
      </section>
      <div className="w-full ">
        <section
          className="relative mb-2 flex h-[44px] w-full items-center border-b 
        border-b-ghost-border"
        >
          {tabItems.map((item, index) => (
            <p
              key={item.label}
              ref={(el) => (tabsRef.current![index] = el!)}
              className={`} h-full cursor-pointer px-8 text-lg
               font-medium capitalize text-[#73747b] ${currentTab === index && 'text-text'}`}
              onClick={() => setCurrentTab(index)}
              onMouseOver={() => setHoveringTab(index)}
              onMouseLeave={() => setHoveringTab(currentTab)}
            >
              {item.label}
            </p>
          ))}
          <span
            className="absolute bottom-0 left-0 block h-[2px] bg-black transition-all delay-0 duration-300 "
            style={{ width: tabUnderlineWidth, left: tabUnderlineLeft }}
          ></span>
        </section>
        <section className="grid grid-cols-[repeat(auto-fill,minmax(184px,1fr))] gap-x-4 gap-y-6">
          {data.map((item) => (
            <Player key={item.id} item={item} />
          ))}
        </section>
      </div>
    </div>
  )
}
