import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadMovieDetails,
  clearCurrentMovie,
} from '../../store/slices/moviesSlice'
import '../../styles/MovieDetail.css'
import type { RootState } from '../../types'
import type { AppDispatch } from '../../store/store'

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { currentMovie, loadingDetails, errorDetails } = useSelector(
    (state: RootState) => state.movies
  )

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

  return (
    <div className="movie-detail" data-testid="movie-detail">
      <div className="movie-detail__container">
        <div className="movie-detail__header">
          <h1 className="movie-detail__title">{currentMovie.name}</h1>
        </div>
        <div className="movie-detail__content">
          <div className="movie-detail__info">
            <div className="movie-detail__field">
              <span className="movie-detail__label">Ano de Lançamento:</span>
              <span className="movie-detail__value">{currentMovie.model}</span>
            </div>
            <div className="movie-detail__field">
              <span className="movie-detail__label">Diretor:</span>
              <span className="movie-detail__value">{currentMovie.director}</span>
            </div>
            <div className="movie-detail__field">
              <span className="movie-detail__label">Gênero:</span>
              <span className="movie-detail__value">{currentMovie.genre}</span>
            </div>
            <div className="movie-detail__field">
              <span className="movie-detail__label">ID:</span>
              <span className="movie-detail__value">{currentMovie.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail