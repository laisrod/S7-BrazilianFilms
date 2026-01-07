import { Link } from 'react-router-dom'
import { useRegisterForm } from '../../hooks/useRegisterForm'
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors'
import '../../styles/Register.css'

const Register = () => {
  const {
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
  } = useRegisterForm()

  return (
    <div className="register">
      <div className="register__container">
        <h1 className="register__title">Cadastro</h1>
        <p className="register__subtitle">Crie sua conta para acessar os filmes</p>
        
        {(error || validationError) && (
          <div className="register__error">
            {validationError || getFirebaseErrorMessage(error)}
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

