import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetMovies, loadMovies } from '../../store/slices/moviesSlice'
import '../../styles/Navigation.css'
import type { RootState } from '../../types'
import type { AppDispatch } from '../../store/store'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { movies, previousPage } = useSelector((state: RootState) => state.movies)

  // Define as rotas
  const isHomePage = location.pathname === '/home'
  const isMovieDetailPage = location.pathname.startsWith('/movie/')
  const hasMultiplePages = movies.length > 10 || previousPage !== null
  const shouldShowButton = (isHomePage && hasMultiplePages) || isMovieDetailPage

  if (!shouldShowButton) {
    return null
  }

  const handleGoHome = () => {
    if (isHomePage) {
      // Se já está na home, apenas reseta os filmes para primeira página
      dispatch(resetMovies())
      dispatch(loadMovies(1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Se está em outra página (detalhes), navega para home e reseta
      navigate('/home')
      dispatch(resetMovies())
      dispatch(loadMovies(1))
    }
  }

  return (
    <nav className="navigation">
      <button
        onClick={handleGoHome}
        className="navigation__home-button"
        type="button"
      >
        Início
      </button>
    </nav>
  )
}

export default Navigation