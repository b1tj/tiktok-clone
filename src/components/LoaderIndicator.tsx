import { twMerge } from 'tailwind-merge'

export function LoaderIndicator() {
  return (
    <div className="fixed left-1/2 top-1/2">
      <Circle className="animate-clockwise bg-[#fe2c55]" />
      <Circle className="animate-counter-clockwise ml-[-5px] bg-[#25f4ee] mix-blend-darken" />
    </div>
  )
}

function Circle({ className }: { className: string }) {
  return (
    <div
      className={twMerge(
        'relative m-0 inline-block aspect-square w-[20px] rounded-full',
        className,
      )}
    ></div>
  )
}
