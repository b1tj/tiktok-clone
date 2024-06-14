import { SignInOption } from '@/components/Auth/SignInOption'
import { Button } from '@/components/common/Button'
import { useAuthContext } from '@/contexts/Consumers/useAuthContext'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { close } from '@/services/store/modal/modalSlice'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function LoginModal() {
  const isShow = useAppSelector((s) => s.modal.isShow)
  const dispatch = useAppDispatch()

  const [render, setRender] = useState(isShow)
  const { user } = useAuthContext()

  const handleOnAnimationEnd: React.AnimationEventHandler = (e) => {
    e.stopPropagation()
    if (!isShow) setRender(false)
  }

  const onClickModalMask: React.MouseEventHandler = (e) => {
    e.stopPropagation()
    dispatch(close())
  }

  useEffect(() => {
    if (isShow) setRender(true)
    if (user) setRender(false)
  }, [isShow, user])

  return (
    render && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        onClick={onClickModalMask}
      >
        <div
          onAnimationEnd={handleOnAnimationEnd}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isShow
              ? 'animate-fade-jump-out animate-duration-300'
              : 'animate-fade-jump-in animate-duration-200'
          } 
          relative  flex h-[642px]  w-[483px] items-center justify-center rounded-lg bg-white p-[64px_56px_0]`}
        >
          <Button
            intent="round"
            className="absolute right-[16px] top-[16px] h-[24px] w-[24px] scale-[1.7] bg-ghost p-0"
            onClick={() => dispatch(close())}
          >
            <X size={15} />
          </Button>
          <SignInOption />
        </div>
      </div>
    )
  )
}
