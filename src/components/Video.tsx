import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import userImg from '@/assets/imgs/mr_freshjpg.jpg'
import { Button } from '@/components/common/Button'
import {
  Bookmark,
  Forward,
  Heart,
  MessageCircleMore,
  Music,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'

import { debounce } from '@/utils/debounce'
import { checkElementInView } from '@/utils/checkElementInView'
import Lazyload from 'react-lazyload'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { mute, unmute, adjustVolume } from '@/services/store/video/videoSlice'
import { Slider } from '@mui/material'

const mockHashtags = [
  {
    title: '#video',
    link: '/tag/video',
  },
  {
    title: '#popular',
    link: '/tag/popular',
  },
  {
    title: '#new_mem',
    link: '/tag/new_mem',
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

type VideoProps = {
  url: string
  preview_img: string
  user: {
    id: number
    name: string
    url: string
  }
}

type Ref = HTMLDivElement

export const Video = forwardRef<Ref, VideoProps>(
  ({ url, preview_img, user }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(document.createElement('video'))
    const [isPlaying, setIsPlaying] = useState(false)
    const videoState = useAppSelector((s) => s.video)
    const videoDispatch = useAppDispatch()

    const handlePlay = useCallback(() => {
      const vidPromise = videoRef.current.play()
      if (vidPromise) {
        vidPromise
          .then(() => {
            videoRef.current.volume = videoState.volume
            setIsPlaying(true)
          })
          .catch(() => {
            setIsPlaying(false)
          })
      }
    }, [videoState.volume])

    const handlePause = () => {
      if (videoRef && videoRef.current) videoRef.current.pause()
      setIsPlaying(false)
    }

    const handleMute = () => {
      if (videoRef && videoRef.current) videoRef.current.muted = true
      if (!videoState.isMuted) {
        videoDispatch(mute())
      }
    }

    const handleUnmute = () => {
      if (videoRef && videoRef.current) videoRef.current.muted = false
      if (videoState.isMuted) {
        videoDispatch(unmute())
      }
    }

    useEffect(() => {
      videoRef.current.volume = videoState.volume
      const onUserScroll = () => {
        if (!videoRef) return

        if (checkElementInView(videoRef.current)) {
          handlePlay()
        } else {
          handlePause()
        }
      }

      const debouncedPlay = debounce(onUserScroll, 700)

      document.addEventListener('scroll', debouncedPlay)

      return () => document.removeEventListener('scroll', debouncedPlay)
    }, [handlePlay, videoState.volume])

    return (
      <div
        ref={ref}
        className="relative flex h-[calc(100vh-60px)] max-w-[692px] gap-[12px] py-[20px]
     after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-y-50
     after:bg-divider after:content-[''] max-[1071px]:w-[592px] max-[1071px]:max-w-[592px]"
      >
        <a href="/@No.Left.Over.Food" className="h-[56px] shrink-0 grow-0">
          <div className="h-[56px] w-[56px] overflow-hidden rounded-full">
            <img src={userImg} alt="userImg" className="h-full w-full" />
          </div>
        </a>

        <div className="flex h-full w-full flex-col">
          <div className="relative w-full">
            <div className="mr-[114px] flex shrink flex-col">
              {/* Author unique ID and Name */}
              <a
                href="/@No.Left.Over.Food"
                className="group flex w-fit cursor-pointer items-center gap-[4px]"
              >
                <h3 className="text-[18px] font-bold leading-[24px] group-hover:underline">
                  {user.name}
                </h3>
                <h4 className="text-[14px] font-semibold leading-[28px]">
                  {user.name}
                </h4>
              </a>

              {/* Description, Hashtag and Music Wrapper*/}
              <div className="w-full">
                <p className="inline break-words text-[16px]">
                  Hi I'm {user.name}
                </p>
                {mockHashtags.map((tag, index) => {
                  return (
                    <React.Fragment key={index}>
                      <a
                        href={tag.link}
                        className="inline w-fit text-hashtag hover:underline"
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
            <Button className="absolute right-0 top-[8px] min-w-[96px] font-medium">
              Follow
            </Button>
          </div>

          {/* Video & Actions Container */}
          <div className="mt-[20px] flex h-full select-none items-end gap-[20px] overflow-hidden">
            {/* Video Container */}
            <div
              className="relative aspect-[9/16] h-full cursor-pointer overflow-hidden
           rounded-lg bg-black bg-cover"
            >
              {/* Video Player Wrapper*/}
              <div className="relative h-full">
                {/* Preview Video Picture */}
                <div className="relative h-full w-full">
                  <Lazyload height={300} throttle={500}>
                    <img
                      src={preview_img}
                      className="absolute inset-0 block h-full w-full max-w-full object-contain"
                      alt=""
                    />
                  </Lazyload>
                </div>

                {/* Video Player */}
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg">
                  <video
                    ref={videoRef}
                    src={url}
                    // preload="auto"
                    playsInline
                    className="h-full w-full object-contain"
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-[32px] flex w-full items-end justify-between px-[12px]">
                  <div className=" p-[10px]">
                    {isPlaying ? (
                      <Pause
                        color="white"
                        className="fill-white"
                        size={20}
                        onClick={handlePause}
                      />
                    ) : (
                      <Play
                        color="white"
                        className="fill-white"
                        size={20}
                        onClick={handlePlay}
                      />
                    )}
                  </div>
                  <div className="group flex flex-col items-center p-[10px]">
                    <VolumeSlider />
                    {videoState.isMuted || videoState.volume === 0 ? (
                      <VolumeX
                        color="white"
                        className="fill-white"
                        size={20}
                        onClick={handleUnmute}
                      />
                    ) : (
                      <Volume2
                        color="white"
                        className="fill-white"
                        size={20}
                        onClick={handleMute}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Container */}
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
  },
)

function VolumeSlider() {
  const dispatch = useAppDispatch()
  const volume = useAppSelector((s) => s.video.volume)

  const handleMouseUp = (value: number) => {
    dispatch(adjustVolume(value))
  }

  const handleAdjustVolume = (volume: number) => {
    dispatch(adjustVolume(volume))
  }

  return (
    <Slider
      value={volume}
      min={0}
      step={0.01}
      max={1}
      aria-label="player-volume-adjustment"
      orientation="vertical"
      className={
        '-mx-2 mb-1 hidden h-16 bg-base-gray bg-opacity-50 group-focus-within:block group-hover:block'
      }
      onChange={(_, value) => handleAdjustVolume(value as number)}
      onChangeCommitted={(_, value) => handleMouseUp(value as number)}
      sx={{
        color: 'white',
        height: 58,
        width: 2,
        '& .MuiSlider-thumb': {
          height: 12,
          width: 12,
          backgroundColor: 'white',
          '&:active, &:hover': {
            boxShadow: 'none',
          },
          '&:after': {
            height: 12,
            width: 12,
          },
        },
      }}
    />
  )
}
