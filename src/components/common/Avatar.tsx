import { Skeleton } from '@mui/material'
import { useState } from 'react'

type AvatarType = {
  src: string
  alt?: string
  size: number
}

/**
 * @param {number} size: the radius of avatar
 */

export function Avatar({ src, alt, size }: AvatarType) {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
  }

  return (
    <div
      className={`overflow-hidden rounded-full ${error ? 'bg-gray-300 opacity-60' : ''}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {!error ? (
        <img
          src={src}
          alt={alt}
          onError={handleError}
          className="h-full w-full object-cover"
        />
      ) : (
        <Skeleton
          animation="pulse"
          height={size}
          width={size}
          variant="circular"
        />
      )}
    </div>
  )
}
