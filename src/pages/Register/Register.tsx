import { Link } from 'react-router-dom'
import { useRegisterForm } from '../../hooks/useRegisterForm'
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors'
import '../../styles/Register.css'

const MOVIE_POSTERS = [
  '/image/tropadeelite.jpg',
  '/image/bacurau.jpg',
  '/image/centraldobrasil.webp',
  '/image/cidadededeus.png',
  '/image/aindaestouaqui.jpg',
  '/image/opagadordepromessas.jpg',
  '/image/carandiru.webp',
  '/image/quehoraselavolta.jpg',
  '/image/autodacompadecida.jpg',
  '/image/donafloreseusdoismaridos.jpg',
  '/image/estomago.jpg',
  '/image/ohomemquecopiava.jpg',
  '/image/lisbelaeoprisioneiro.jpg',
  '/image/opalhaco.jpeg',
  '/image/oagente.jpg',
  '/image/tropadeelite.jpg',
  '/image/bacurau.jpg',
  '/image/centraldobrasil.webp',
  '/image/cidadededeus.png',
  '/image/aindaestouaqui.jpg',
]

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
      <div className="register__mosaic">
        {MOVIE_POSTERS.map((poster, index) => (
          <div key={index} className="register__mosaic-item">
            <img src={poster} alt="" className="register__mosaic-img" />
          </div>
        ))}
      </div>

      <div className="register__overlay" />

      <div className="register__content">
        <h1 className="register__brand">Crie sua conta</h1>
        <p className="register__tagline">
          Junte-se e explore o cinema brasileiro
        </p>

        {(error || validationError) && (
          <div className="register__error">
            {validationError || getFirebaseErrorMessage(error)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register__form">
          <div className="register__field">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="register__input"
              required
              disabled={loading}
            />
          </div>

          <div className="register__field">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha (mínimo 6 caracteres)"
              className="register__input"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="register__field">
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar senha"
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
