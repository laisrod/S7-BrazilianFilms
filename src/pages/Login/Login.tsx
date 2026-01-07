import { Link } from 'react-router-dom'
import { useLoginForm } from '../../hooks/useLoginForm'
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors'
import '../../styles/Login.css'

const Login = () => {
  const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginForm()

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Login</h1>
        <p className="login__subtitle">Entre para acessar os filmes</p>
        
        {error && (
          <div className="login__error">
            {getFirebaseErrorMessage(error)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__field">
            <label htmlFor="email" className="login__label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="login__input"
              required
              disabled={loading}
            />
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="login__input"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="login__button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login__link-text">
          Não tem conta?{' '}
          <Link to="/register" className="login__link">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

