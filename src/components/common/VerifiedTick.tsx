import { Check } from 'lucide-react'

type VerifiedTickType = {
  size?: number
}

export const VerifiedTick = ({ size = 12 }: VerifiedTickType) => {
  return (
    <div
      className="flex items-center justify-center overflow-hidden rounded-full bg-[rgb(32,213,236)] p-0.5"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Check size={size} color="white" strokeWidth={4} />
    </div>
  )
}
