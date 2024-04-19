import { Video } from '@/components/Video'

export function ListVideo() {
  return (
    <div className="flex h-full w-full min-w-[420px] shrink flex-col items-center justify-start">
      <Video />
      <Video />
      <Video />
      <Video />
      <Video />
    </div>
  )
}
