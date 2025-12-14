import { useState, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../../store/slices/authSlice'
import '../../styles/Register.css'
import type { AppDispatch } from '../../store/store'
import type { RootState } from '../../types'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError('')

    // Validação de senhas
    if (password !== confirmPassword) {
      setValidationError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setValidationError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    const result = await dispatch(registerUser({ email, password }))
    if (registerUser.fulfilled.match(result)) {
      navigate('/welcome')
    }
  }

  const getErrorMessage = (errorCode: string) => {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Este email já está cadastrado',
      'auth/invalid-email': 'Email inválido',
      'auth/weak-password': 'Senha muito fraca (mínimo 6 caracteres)',
    }
    return errorMessages[errorCode] || error || 'Erro ao cadastrar'
  }

  return (
    <div className="register">
      <div className="register__container">
        <h1 className="register__title">Cadastro</h1>
        <p className="register__subtitle">Crie sua conta para acessar os filmes</p>
        
        {(error || validationError) && (
          <div className="register__error">
            {validationError || getErrorMessage(error || '')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register__form">
          <div className="register__field">
            <label htmlFor="email" className="register__label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="register__input"
              required
              disabled={loading}
            />
          </div>

          <div className="register__field">
            <label htmlFor="password" className="register__label">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="register__input"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="register__field">
            <label htmlFor="confirmPassword" className="register__label">
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite a senha novamente"
              className="register__input"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="register__button"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="register__link-text">
          Já tem conta?{' '}
          <Link to="/login" className="register__link">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register

