import { Link } from 'react-router-dom'
import { useLoginForm } from '../../hooks/useLoginForm'
import { getFirebaseErrorMessage } from '../../utils/firebaseErrors'
import '../../styles/Login.css'

const MOVIE_POSTERS = [
  '/image/cidadededeus.png',
  '/image/autodacompadecida.jpg',
  '/image/centraldobrasil.webp',
  '/image/tropadeelite.jpg',
  '/image/bacurau.jpg',
  '/image/carandiru.webp',
  '/image/aindaestouaqui.jpg',
  '/image/quehoraselavolta.jpg',
  '/image/opagadordepromessas.jpg',
  '/image/donafloreseusdoismaridos.jpg',
  '/image/lisbelaeoprisioneiro.jpg',
  '/image/ohomemquecopiava.jpg',
  '/image/estomago.jpg',
  '/image/opalhaco.jpeg',
  '/image/oagente.jpg',
  '/image/cidadededeus.png',
  '/image/autodacompadecida.jpg',
  '/image/centraldobrasil.webp',
  '/image/tropadeelite.jpg',
  '/image/bacurau.jpg',
]

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
      <div className="login__mosaic">
        {MOVIE_POSTERS.map((poster, index) => (
          <div key={index} className="login__mosaic-item">
            <img src={poster} alt="" className="login__mosaic-img" />
          </div>
        ))}
      </div>

      <div className="login__overlay" />

      <div className="login__content">
        <h1 className="login__brand">Filmes Brasileiros</h1>
        <p className="login__tagline">
          Descubra o melhor do cinema nacional
        </p>

        {error && (
          <div className="login__error">
            {getFirebaseErrorMessage(error)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__field">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="login__input"
              required
              disabled={loading}
            />
          </div>

          <div className="login__field">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
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
          Novo por aqui?{' '}
          <Link to="/register" className="login__link">
            Cadastre-se agora
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
