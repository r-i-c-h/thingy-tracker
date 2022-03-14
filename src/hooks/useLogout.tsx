import { useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState<unknown>(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true)
    setError(null)

    try {
      await projectAuth.signOut();

      dispatch!({ type: 'LOGOUT' })

      setIsPending(false)
      setError(null)
    } catch (err) {

      setIsPending(false)
      setError(err)
    }
  }

  return { error, isPending, logout }
}