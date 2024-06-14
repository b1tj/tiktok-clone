import { useCallback, useEffect, useRef, useState } from 'react'
import { Video } from '@/components/Video'
import {
  createClient,
  Video as PexelsVideoType,
  Videos as PexelsVideosResponse,
  ErrorResponse,
} from 'pexels'
import { LoaderIndicator } from '@/components/common/LoaderIndicator'

export function ListVideo() {
  const [videos, setVideos] = useState<PexelsVideoType[]>([])
  const client = useRef(createClient(import.meta.env.VITE_VIDEO_API_KEY))
  const [loading, setLoading] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const loadMoreItems = useCallback(async () => {
    if (loading) return
    setLoading(true)
    setCurrentPage(currentPage + 1)

    // Fetch more videos
    const res = await client.current.videos.search({
      query: 'cat, dog',
      per_page: 10,
      page: currentPage + 1,
    })
    if ('videos' in res) {
      setVideos((prev) => [...prev, ...res.videos])
    }

    setLoading(false)
  }, [loading, currentPage])

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, loadMoreItems],
  )

  useEffect(() => {
    client.current.videos
      .search({ per_page: 10, query: 'cat, dog' })
      .then((res: PexelsVideosResponse | ErrorResponse) => {
        if ('videos' in res) {
          setVideos(res.videos)
        } else {
          // ErrorResponse
          console.log(res.error)
        }
      })
  }, [])

  return (
    <>
      <div className="flex h-full w-full min-w-[420px] shrink flex-col items-center justify-start">
        {videos &&
          videos.map((video: PexelsVideoType, index) =>
            videos.length === index + 1 ? (
              <Video
                ref={lastItemRef}
                key={video.video_files[0].id}
                url={video.video_files[0].link}
                preview_img={video.video_pictures[0].picture}
                user={video.user}
              />
            ) : (
              <Video
                key={video.video_files[0].id}
                url={video.video_files[0].link}
                preview_img={video.video_pictures[0].picture}
                user={video.user}
              />
            ),
          )}
      </div>
      {loading && <LoaderIndicator />}
    </>
  )
}
