import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadMovieDetails,
  clearCurrentMovie,
} from '../../store/slices/moviesSlice'
import { getMoviesByGenre, getAllMovies } from '../../services/moviesService'
import DirectorCard from '../../components/DirectorCard/DirectorCard'
import MovieCard from '../../components/MovieCard/MovieCard'
import '../../styles/MovieDetail.css'
import type { RootState, Movie } from '../../types'
import type { AppDispatch } from '../../store/store'

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { currentMovie, loadingDetails, errorDetails } = useSelector(
    (state: RootState) => state.movies
  )

  // Busca todos os filmes do diretor (incluindo o atual para a ficha)
  const [directorMovies, setDirectorMovies] = React.useState<Movie[]>([])
  const [relatedByGenre, setRelatedByGenre] = React.useState<Movie[]>([])

  React.useEffect(() => {
    const loadRelatedMovies = async () => {
      if (!currentMovie) return
      
      const [director, genre] = await Promise.all([
        getAllMovies().then(movies => movies.filter(m => m.director === currentMovie.director)),
        getMoviesByGenre(currentMovie.genre, currentMovie.id, 3)
      ])
      
      setDirectorMovies(director)
      setRelatedByGenre(genre)
    }
    
    loadRelatedMovies()
  }, [currentMovie])

  useEffect(() => {
    if (id) {
      dispatch(loadMovieDetails(id))
    }

    return () => {
      dispatch(clearCurrentMovie())
    }
  }, [id, dispatch])

  if (loadingDetails) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__loading" data-testid="movie-detail-loading">
          <p>Carregando detalhes do filme...</p>
        </div>
      </div>
    )
  }

  if (errorDetails) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__error" data-testid="movie-detail-error">
          <p>Erro ao carregar filme: {errorDetails}</p>
        </div>
      </div>
    )
  }

  if (!currentMovie) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__not-found" data-testid="movie-detail-not-found">
          <p>Filme não encontrado</p>
        </div>
      </div>
    )
  }

  const imageUrl = currentMovie.image || `/image/${currentMovie.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')}.jpg`

  return (
    <div className="movie-detail" data-testid="movie-detail">
      <div className="movie-detail__container">
        {/* Seção Principal do Filme */}
        <section className="movie-detail__main">
          <div className="movie-detail__image-wrapper">
            <img
              src={imageUrl}
              alt={currentMovie.name}
              className="movie-detail__image"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://via.placeholder.com/600x800/006b3c/ffd700?text=${encodeURIComponent(currentMovie.name)}`
              }}
            />
          </div>
          <div className="movie-detail__info-wrapper">
            <h1 className="movie-detail__title">{currentMovie.name}</h1>
            <p className="movie-detail__description">
              Um clássico do cinema brasileiro que marcou gerações. Este filme representa
              a excelência da produção cinematográfica nacional, destacando-se pela sua
              narrativa envolvente e qualidade técnica.
            </p>
            <div className="movie-detail__specs">
              <div className="movie-detail__spec-item">
                <span className="movie-detail__spec-label">Ano:</span>
                <span className="movie-detail__spec-value">{currentMovie.model}</span>
              </div>
              <div className="movie-detail__spec-item">
                <span className="movie-detail__spec-label">Gênero:</span>
                <span className="movie-detail__spec-value">{currentMovie.genre}</span>
              </div>
              <div className="movie-detail__spec-item">
                <span className="movie-detail__spec-label">Diretor:</span>
                <span className="movie-detail__spec-value">{currentMovie.director}</span>
              </div>
              {currentMovie.awarded && (
                <div className="movie-detail__spec-item">
                  <span className="movie-detail__spec-label">Status:</span>
                  <span className="movie-detail__spec-value movie-detail__spec-value--awarded">
                    Premiado
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Seção de Diretores - Ficha do Diretor */}
        {currentMovie && directorMovies.length > 0 && (
          <section className="movie-detail__section">
            <h2 className="movie-detail__section-title">DIRETOR</h2>
            <div className="movie-detail__director-wrapper">
              <DirectorCard
                directorName={currentMovie.director}
                movies={directorMovies}
                onMovieClick={(movieId) => navigate(`/movie/${movieId}`)}
              />
            </div>
          </section>
        )}

        {/* Seção de Filmes Relacionados (mesmo gênero) */}
        {relatedByGenre.length > 0 && (
          <section className="movie-detail__section">
            <h2 className="movie-detail__section-title">FILMES RELACIONADOS</h2>
            <div className="movie-detail__related-movies-grid">
              {relatedByGenre.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  name={movie.name}
                  model={movie.model}
                  image={movie.image}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default MovieDetail