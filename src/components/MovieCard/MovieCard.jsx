import './MovieCard.css'

const MovieCard = ({ name, model }) => {
  return (
    <div className="movie-card" data-testid="movie-card">
      <div className="movie-card__content">
        <h3 className="movie-card__name">{name}</h3>
        <p className="movie-card__year">
          <span className="movie-card__label">Ano:</span> {model}
        </p>
      </div>
    </div>
  )
}

export default MovieCard

