import { useSelector } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import '../../styles/MovieList.css'
import type { RootState } from '../../types'

const MovieList = () => {
  const { movies, loading, error } = useSelector((state: RootState) => state.movies)

  if (loading) {
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

  console.log('Movies no MovieList:', movies) // Debug

  return (
    <div className="movie-list" data-testid="movie-list">
      {movies.map((movie, index) => {
        console.log(`Movie ${index}:`, movie) // Debug
        return (
          <MovieCard
            key={movie.id || index}
            id={movie.id}
            name={movie.name}
            model={movie.model}
          />
        )
      })}
    </div>
  )
}

export default MovieList

