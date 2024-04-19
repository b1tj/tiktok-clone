import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(debounce)
  }, [value, delay])

  return debouncedValue
}
