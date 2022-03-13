import { useState } from 'react'
import { projectAuth } from '../firebase/config'

export const useSignup = () => {
  const [error, setError] = useState<unknown>(null)
  const [isPending, setIsPending] = useState(false)

  const signup = async (email: string, password: string, displayName: string) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) { throw new Error('Could not complete signup') }

      // add display name to user
      await res.user?.updateProfile({ displayName })
      setIsPending(false)
      setError(null)
    } catch (error) {
      setError(error)
      setIsPending(false)
    }
  }


  return { error, isPending, signup }
}