import { useState, FormEvent } from 'react'
import { useAuth } from './useAuth'

export const useRegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')

  const { loading, error, register } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError('')

    if (password !== confirmPassword) {
      setValidationError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setValidationError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    await register(email, password)
  }

  return {
    email,
    password,
    confirmPassword,
    validationError,
    loading,
    error,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  }
}

