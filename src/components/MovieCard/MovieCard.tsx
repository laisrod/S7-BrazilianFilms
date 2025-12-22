import { useNavigate } from 'react-router-dom'
import '../../styles/MovieCard.css'

interface MovieCardProps {
  id: number
  name: string
  model: string
  image?: string
}

const MovieCard = ({ id, name, model, image }: MovieCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (id) {
      navigate(`/movie/${id}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      className="movie-card"
      data-testid="movie-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
    >
      {image && (
        <div className="movie-card__image-container">
          <img 
            src={image} 
            alt={name}
            className="movie-card__image"
            onError={(e) => {
              // Se a imagem não carregar, usa placeholder
              const target = e.target as HTMLImageElement
              target.src = `https://via.placeholder.com/400x600/006b3c/ffd700?text=${encodeURIComponent(name)}`
            }}
          />
        </div>
      )}
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

