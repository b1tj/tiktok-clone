import { SnackbarContext } from '@/contexts/Providers/SnackbarContext'
import { useContext } from 'react'

export function useSnackbarContext() {
  const context = useContext(SnackbarContext)

  if (!context) {
    throw new Error('Cannot use outside of  SnackbarContext')
  }

  return context
}
