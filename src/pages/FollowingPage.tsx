import { Avatar } from '@/components/common/Avatar'
import { Button } from '@/components/common/Button'
import { Skeleton } from '@mui/material'
import axios from 'axios'
import { lazy, useEffect, useState } from 'react'

const VerifiedTick = lazy(() =>
  import('@/components/common/VerifiedTick').then(({ VerifiedTick }) => ({
    default: VerifiedTick,
  })),
)

type UserType = {
  name: string
  userName: string
  avatar: string
}

export const FollowingPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const result = await axios.get<UserType[]>(
          'https://6644c507b8925626f88fdff5.mockapi.io/users?limit=10',
        )

        setUsers(result.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="relative w-full min-w-[420px]">
      <div className="mx-auto grid w-[736px] grid-cols-3 content-center gap-[18px] pt-5">
        {!isLoading
          ? users.map((user) => (
              <UserCard
                key={user.userName}
                userId={user.userName}
                userName={user.name}
                avatarSrc={user.avatar}
              />
            ))
          : [...Array(18).keys()].map((key) => (
              <Skeleton
                key={key}
                variant="rectangular"
                height={302}
                width={226}
                className="rounded-lg"
              />
            ))}
      </div>
    </div>
  )
}

type UserCardType = {
  userId: string
  userName: string
  avatarSrc?: string
}

function UserCard({ userId, userName, avatarSrc = '' }: UserCardType) {
  return (
    <div className="relative h-[302px] w-[226px] overflow-hidden rounded-lg bg-gray-500">
      <a
        href={`/@${userId}`}
        target="_blank"
        className="block h-full w-full bg-input"
      >
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-1 px-3 py-5 text-white">
          <Avatar src={avatarSrc} size={48} />
          <h3 className="text-lg font-bold">{userName}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">{userId}</h4>
            <VerifiedTick />
          </div>
          <Button intent={'fill'} className="min-w-[164px]">
            Follow
          </Button>
        </div>
      </a>
    </div>
  )
}
