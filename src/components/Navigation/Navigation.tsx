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
  const isHomePage = location.pathname === '/'
  const hasMultiplePages = movies.length > 10 || previousPage !== null
  const shouldShowButton = !isHomePage || (isHomePage && hasMultiplePages)

  if (!shouldShowButton) {
    return null
  }

  const handleGoHome = () => {
    // Se já está na home, apenas reseta os filmes
    if (isHomePage) {
      dispatch(resetMovies())
      dispatch(loadMovies(1))
      // Scroll para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Se está em outra página, navega para home e reseta
      navigate('/')
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
        INICIO
      </button>
    </nav>
  )
}

export default Navigation

