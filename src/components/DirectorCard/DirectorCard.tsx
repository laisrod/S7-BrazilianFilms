import '../../styles/DirectorCard.css'
import type { Movie } from '../../types'

// componente com router
interface DirectorCardProps {
  directorName: string
  movies: Movie[]
  onMovieClick?: (movieId: number) => void
}

const DirectorCard = ({ directorName, movies, onMovieClick }: DirectorCardProps) => {
  const handleMovieClick = (movieId: number) => {
    if (onMovieClick) {
      onMovieClick(movieId)
    }
  }

  return (
    <div className="director-card" data-testid="director-card">
      <div className="director-card__header">
        <h3 className="director-card__name">{directorName}</h3>
        <p className="director-card__label">Diretor</p>
      </div>
      <div className="director-card__body">
        <div className="director-card__info">
          <div className="director-card__info-item">
            <span className="director-card__info-label">Total de Filmes:</span>
            <span className="director-card__info-value">{movies.length}</span>
          </div>
          {movies.length > 0 && (
            <div className="director-card__info-item">
              <span className="director-card__info-label">Primeiro Filme:</span>
              <span className="director-card__info-value">
                {movies[0].name} ({movies[0].model})
              </span>
            </div>
          )}
        </div>
        {movies.length > 0 && (
          <div className="director-card__movies">
            <p className="director-card__movies-title">Outros Filmes:</p>
            <div className="director-card__movies-list">
              {movies.slice(0, 3).map((movie) => (
                <div
                  key={movie.id}
                  className="director-card__movie-item"
                  onClick={() => handleMovieClick(movie.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleMovieClick(movie.id)
                    }
                  }}
                >
                  <div className="director-card__movie-image-wrapper">
                    <img
                      src={
                        movie.image ||
                        `/image/${movie.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')}.jpg`
                      }
                      alt={movie.name}
                      className="director-card__movie-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `https://via.placeholder.com/150x225/006b3c/ffd700?text=${encodeURIComponent(movie.name)}`
                      }}
                    />
                  </div>
                  <p className="director-card__movie-name">{movie.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DirectorCard

