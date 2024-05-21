import { Button } from '@/components/common/Button'
import { Player } from '@/components/Player'
import { exploreTags } from '@/shared/constants/items'
import { PlayerType } from '@/shared/types/types'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

const tags = [...exploreTags]

export const ExplorePage = () => {
  const [activeTag, setActiveTag] = useState(0)

  //TODO: Fetch data base on current tag content
  useEffect(() => {}, [activeTag])

  return (
    <div className="-ml-4 min-h-[calc(100vh-60px)] w-full overflow-hidden px-12 pb-8 pt-24">
      <TagList setActiveTag={setActiveTag} tags={tags} activeTag={activeTag} />
      <VideoFeed />
    </div>
  )
}
type TaglistProps = {
  tags: string[]
  activeTag: number
  setActiveTag: (tagIndex: number) => void
}

type Direction = 'up' | 'down'

function TagList({ tags, activeTag, setActiveTag }: TaglistProps) {
  const [direction, setDirection] = useState<Direction>('up')
  const scrollRef = useRef(window.scrollY)

  const checkDirection = useCallback(() => {
    if (window.scrollY > scrollRef.current) {
      setDirection('down')
    } else {
      setDirection('up')
    }
    scrollRef.current = window.scrollY
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', checkDirection)

    return () => window.removeEventListener('scroll', checkDirection)
  }, [checkDirection])

  return (
    <div
      className={`fixed top-[60px] z-10 flex w-full gap-3 overflow-hidden bg-white pb-4 pt-7 
      ${direction === 'down' ? 'translate-y-[-86px] transition-all duration-500' : 'transition-all duration-500'}`}
    >
      {tags.map((tag, index) => (
        <Button
          key={tag}
          className={`h-[42px] w-fit text-nowrap rounded-lg font-medium hover:bg-[#1618231a] 
          ${index === activeTag ? 'bg-[#1b1b1b] text-white hover:text-text' : ''}`}
          onClick={() => setActiveTag(index)}
          intent={'action'}
        >
          {tag}
        </Button>
      ))}
    </div>
  )
}

function VideoFeed() {
  const [data, setData] = useState<PlayerType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<PlayerType[]>(
          'https://jsonplaceholder.typicode.com/albums/1/photos',
        )

        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-x-4 gap-y-6">
      {data.map((item) => (
        <Player key={item.id} item={item} />
      ))}
    </div>
  )
}
