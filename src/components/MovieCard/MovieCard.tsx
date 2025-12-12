import { useNavigate } from 'react-router-dom'
import '../../styles/MovieCard.css'

interface MovieCardProps {
  id: number
  name: string
  model: string
}

const MovieCard = ({ id, name, model }: MovieCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log('Card clicado! ID:', id) // Debug
    if (id) {
      navigate(`/movie/${id}`) // Navega para /movie/1, /movie/2, etc.
    } else {
      console.error('ID não encontrado!')
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

