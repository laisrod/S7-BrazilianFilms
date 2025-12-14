import { useState, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../../store/slices/authSlice'
import { loadMovies, resetMovies } from '../../store/slices/moviesSlice'
import '../../styles/Login.css'
import type { AppDispatch } from '../../store/store'
import type { RootState } from '../../types'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(result)) {
      // Carrega os filmes após o login bem-sucedido
      dispatch(resetMovies())
      dispatch(loadMovies(1))
      navigate('/welcome')
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Login</h1>
        <p className="login__subtitle">Entre para acessar os filmes</p>
        
        {error && (
          <div className="login__error">
            {error}
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

