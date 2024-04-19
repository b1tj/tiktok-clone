import React, { useEffect, useState } from 'react'
import { SelectInstance } from 'react-select'

type Options = {
  value: string
  label: string
}

export function useSelectState(
  ref: React.RefObject<SelectInstance<Options> | null>,
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    const clickHandler = () => {
      if (ref.current) {
        setIsMenuOpen(() => false)
      }
    }

    document.addEventListener('mousedown', clickHandler)

    return () => document.removeEventListener('mousedown', clickHandler)
  }, [ref])
  return { isMenuOpen, setIsMenuOpen }
}
