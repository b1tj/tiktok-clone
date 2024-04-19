import { useSnackbarContext } from '@/contexts/Consumers/useSnackbarContext'
import { Snackbar as MuiSnackbar, SnackbarContent } from '@mui/material'

type SnackbarProps = {
  onAnimationEnd: () => void
}

export function Snackbar({ onAnimationEnd }: SnackbarProps) {
  const { isShow, snackBarMessage } = useSnackbarContext()

  return (
    <MuiSnackbar
      open={isShow}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      className="fixed left-0 top-4 ml-[calc(-50vw+50%)] w-screen animate-fade-down 
          justify-center animate-duration-[1000] animate-fill-forwards"
      onAnimationEnd={onAnimationEnd}
    >
      <SnackbarContent
        message={snackBarMessage}
        className="w-[50%] items-center justify-center bg-snack-bar"
      />
    </MuiSnackbar>
  )
}
