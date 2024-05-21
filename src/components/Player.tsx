import { Play } from 'lucide-react'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { twMerge } from 'tailwind-merge'

type PlayerType = {
  item: {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
  }
} & React.HTMLAttributes<HTMLDivElement>

export const Player = React.memo(function Player({
  item,
  className,
  ...props
}: PlayerType) {
  return (
    <div
      {...props}
      className={twMerge(
        'relative w-full overflow-hidden rounded-md',
        className,
      )}
    >
      <div className="aspect-[1/1.32]">
        <LazyLoad className="size-full">
          <img src={item.url} alt="" className="size-full object-cover" />
        </LazyLoad>
        <div
          className="absolute bottom-0 flex h-24 w-full 
      items-center space-x-1 bg-gradient-to-b from-[rgba(22,24,35,0)] from-5% to-[rgba(22,24,35,0.5)] to-95% p-[67px_13px_17px]"
        >
          <Play color="white" size={18} />
          <span className="text-base font-medium text-white">{`${Math.round(Math.random() * 1000) / 100}M`}</span>
        </div>
      </div>
    </div>
  )
})
