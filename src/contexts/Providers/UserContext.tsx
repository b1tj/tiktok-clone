import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

type UserContextType = {
  user: {
    id: string
    name: string
    username: string
    email: string
    isActive: boolean
    avatarUrl?: string
  } | null
  loading: boolean
  signOut: () => void
  handleLoginGoogle: () => void
}

type UserContextProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  const handleLoginGoogle = () => {
    // Call Api login
    const fetchUser = () => {
      fetch('https://randomuser.me/api/')
        .then((response) => response.json())
        .then((result) => setUser(result.results[0]))
        .catch((error) => console.log('An error occured: ', error))
    }
    fetchUser()
  }

  //fetch user from an api
  useEffect(() => {
    //fetch user and setUser here
    const fetchUser = () => {
      setLoading(true)
      fetch('https://randomuser.me/api/')
        .then((response) => response.json())
        .then((result) => {
          setUser(result.results[0])
          setLoading(false)
        })
        .catch((error) => console.log('An error occured: ', error))
    }
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, signOut, handleLoginGoogle }}>
      {children}
    </UserContext.Provider>
  )
}
