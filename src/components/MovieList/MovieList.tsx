import MovieCard from '../MovieCard/MovieCard'
import { useMovies } from '../../hooks/useMovies'
import '../../styles/MovieList.css'

const MovieList = () => {
  const { movies, loading, error, nextPage, observerTarget } = useMovies()

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
            image={movie.image}
          />
        )
      })}

      {/* Elemento observado pelo infinite */}
      {nextPage && (
        <div ref={observerTarget} className="movie-list__observer">
          {loading && (
            <div className="movie-list__loading" data-testid="movie-list-loading-more">
              <p>Carregando mais filmes...</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MovieList