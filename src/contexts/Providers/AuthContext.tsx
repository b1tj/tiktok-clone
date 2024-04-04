import { createContext, ReactNode } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/firebase-config'

type AuthContextProviderProps = {
  children: ReactNode
}

type AuthContextType = {
  googleSignIn: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <AuthContext.Provider value={{ googleSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}
