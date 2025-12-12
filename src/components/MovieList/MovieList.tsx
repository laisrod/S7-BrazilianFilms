import { useSelector, useDispatch } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import '../../styles/MovieList.css'
import type { RootState } from '../../types'
import type { AppDispatch } from '../../store/store'
import { loadMovies } from '../../store/slices/moviesSlice'

const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { movies, loading, error, nextPage } = useSelector((state: RootState) => state.movies)

  const handleLoadMore = () => {
    if (nextPage && !loading) {
      dispatch(loadMovies(nextPage))
    }
  }

  if (loading && movies.length === 0) {
    return (
      <div className="movie-list__loading" data-testid="movie-list-loading">
        <p>Carregando filmes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movie-list__error" data-testid="movie-list-error">
        <p>Erro ao carregar filmes: {error}</p>
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list__empty" data-testid="movie-list-empty">
        <p>Nenhum filme encontrado.</p>
      </div>
    )
  }

  return (
    <div className="movie-list" data-testid="movie-list">
      {movies.map((movie, index) => {
        return (
          <MovieCard
            key={movie.id || index}
            id={movie.id}
            name={movie.name}
            model={movie.model}
          />
        )
      })}

      {/* BOTÃO "VER MAIS" */}
      {nextPage && (
        <div className="movie-list__load-more">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="movie-list__load-more-button"
          >
            {loading ? 'Carregando...' : 'Ver Mais'}
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieList