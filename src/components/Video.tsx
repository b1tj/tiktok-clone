import React, { useRef } from 'react'
import userImg from '@/assets/imgs/mr_freshjpg.jpg'
import { Button } from '@/components/Button'
import {
  Bookmark,
  Forward,
  Heart,
  MessageCircleMore,
  Music,
} from 'lucide-react'

import previewImg from '@/assets/imgs/mr_freshjpg.jpg'
import videoSrc from '@/assets/videos/Download.mp4'

const mockHashtags = [
  {
    title: '#freshfood',
    link: '/tag/freshfood',
  },
  {
    title: '#freshfood',
    link: '/tag/freshfood',
  },
  {
    title: '#freshfood',
    link: '/tag/freshfood',
  },
]

const actionItems = [
  {
    id: 'like',
    label: 'Like video',
    icon: Heart,
  },

  {
    id: 'comments',
    label: 'Read or add comments',
    icon: MessageCircleMore,
  },

  {
    id: 'add_to_favorites',
    label: 'Add to Favorites',
    icon: Bookmark,
  },

  {
    id: 'share',
    label: 'Share video',
    icon: Forward,
  },
]

export function Video() {
  const videoRef = useRef<HTMLVideoElement>(document.createElement('video'))

  const handlePlay = () => {
    if (videoRef) videoRef.current.play()
  }

  return (
    <div
      className="relative flex max-w-[692px] gap-[12px] py-[20px] after:absolute
     after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-y-50 after:bg-divider
     after:content-['']"
    >
      <a href="/@No.Left.Over.Food" className="h-[56px] shrink-0 grow-0">
        <div className="h-[56px] w-[56px] overflow-hidden rounded-full">
          <img src={userImg} alt="userImg" className="h-full w-full" />
        </div>
      </a>

      <div className="flex flex-col">
        <div className="flex gap-[16px]">
          <div>
            {/* Author unique ID and Name */}
            <a
              href="/@No.Left.Over.Food"
              className="group flex w-fit cursor-pointer items-center gap-[4px]"
            >
              <h3 className="text-[18px] font-bold leading-[24px] group-hover:underline">
                No.Left.Over.Food
              </h3>
              <h4 className="text-[14px] font-semibold leading-[28px]">
                Mr.Fresh
              </h4>
            </a>

            {/* Description, Hashtag and Music Wrapper*/}
            <div>
              <p className="inline break-words text-[16px]">
                Im Mr.Fresh I only eat new food not leftover one 😒
              </p>
              {mockHashtags.map((tag, index) => {
                return (
                  <React.Fragment key={index}>
                    <a
                      href={tag.link}
                      className="text-hashtag  hover:underline"
                    >
                      <strong className="font-semibold">{tag.title}</strong>
                    </a>
                    <span> </span>
                  </React.Fragment>
                )
              })}

              {/* Music wrapper */}
              <div className="group ml-[4px] w-fit text-[14px] font-semibold">
                <h4>
                  <a href="/music/#" className="flex items-center gap-[5px]">
                    <Music size={14} />
                    <div className="group-hover:underline">
                      Legends Never Die | R1o Remix - zjc{' '}
                    </div>
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <Button className="mt-[12px] min-w-[96px]">Follow</Button>
        </div>

        {/* Video */}
        <div className="mt-[20px] flex gap-[20px] overflow-hidden">
          <div
            className="relative aspect-[9/16] h-[600px] cursor-pointer overflow-hidden
           rounded-lg bg-black bg-cover max-[1919px]:h-[calc(316.667px+17.3611vw)]"
          >
            {/* Canvas placeholder */}

            {/* Video Player Wrapper*/}
            <div className="">
              {/* Preview Video Picture */}
              <div className="h-full w-full">
                <img
                  src={previewImg}
                  className="absolute inset-0 block h-full w-full max-w-full object-contain"
                />
              </div>
              <div className="h-full w-full overflow-hidden rounded-lg">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  playsInline
                  className="absolute inset-0 block h-full w-full object-contain"
                  onMouseDown={handlePlay}
                />
              </div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div></div>
            </div>
          </div>

          {/* Action Container */}
          <div className="flex flex-col self-end">
            {actionItems.map((item) => (
              <React.Fragment key={item.id}>
                <Button
                  intent="action"
                  size="unset"
                  className="fi flex flex-col"
                >
                  <div className="">
                    <item.icon size={24} />
                  </div>
                </Button>
                <span className="mt-[4px] text-center text-[13px] font-bold text-text-fade">
                  100k
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
