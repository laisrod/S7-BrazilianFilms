import { useState, FormEvent } from 'react'
import { useAuth } from './useAuth'


export const useLoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, login } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(email, password)
  }

  return {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  }
}

