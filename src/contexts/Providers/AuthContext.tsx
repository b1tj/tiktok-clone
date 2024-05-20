import { auth } from '@/services/firebase/firebase-config'
import {
  User as FirebaseUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { ReactNode, createContext, useEffect, useState } from 'react'

type AuthContextProviderProps = {
  children: ReactNode
}

type AuthContextType = {
  googleSignIn: () => void
  signOutUser: () => void
  user: FirebaseUser | null
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(false)

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
    }
  }

  const signOutUser = () => {
    signOut(auth)
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      localStorage.setItem('user', JSON.stringify(currentUser))
    })

    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider
      value={{ googleSignIn, signOutUser, user, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
