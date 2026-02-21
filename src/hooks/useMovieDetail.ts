import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { loadMovieDetails, clearCurrentMovie } from '../store/slices/moviesSlice'
import { getMoviesByGenre, getAllMovies } from '../services/moviesService'
import { fetchWatchProviders, searchMovieInTMDB } from '../services/moviesService'
import { useNavigation } from './useNavigation'
import type { Movie, TMDBWatchProvider } from '../types'

interface WatchProviders {
  flatrate?: TMDBWatchProvider[]
  rent?: TMDBWatchProvider[]
  buy?: TMDBWatchProvider[]
  link?: string
}

const getTmdbId = async (movie: Movie): Promise<number | null> => {
  if (movie.tmdbId) {
    return movie.tmdbId
  }

  if (!movie.name) {
    return null
  }

  const year = parseInt(movie.model) || undefined
  const searchResult = await searchMovieInTMDB(movie.name, year)

  if (searchResult && searchResult.movie && searchResult.movie.id) {
    return searchResult.movie.id
  }

  return null
}

export const useMovieDetail = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { currentMovie, loadingDetails, errorDetails } = useAppSelector(
    (state) => state.movies
  )
  const { goTo } = useNavigation()

  const [directorMovies, setDirectorMovies] = useState<Movie[]>([])
  const [relatedByGenre, setRelatedByGenre] = useState<Movie[]>([])
  const [watchProviders, setWatchProviders] = useState<WatchProviders | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(loadMovieDetails(id))
    }

    return () => {
      dispatch(clearCurrentMovie())
    }
  }, [id, dispatch])

  useEffect(() => {
    if (!currentMovie) {
      setDirectorMovies([])
      setRelatedByGenre([])
      setWatchProviders(null)
      return
    }

    const loadRelatedData = async () => {
      const allMovies = await getAllMovies()
      const moviesByDirector = allMovies.filter(
        (movie) => movie.director === currentMovie.director
      )

      const moviesByGenre = await getMoviesByGenre(
        currentMovie.genre,
        currentMovie.id,
        3
      )

      setDirectorMovies(moviesByDirector)
      setRelatedByGenre(moviesByGenre)
    }

    const loadProviders = async () => {
      const tmdbId = await getTmdbId(currentMovie)

      if (!tmdbId) {
        setWatchProviders(null)
        return
      }

      const providers = await fetchWatchProviders(tmdbId)

      if (providers && providers.results && providers.results.BR) {
        setWatchProviders(providers.results.BR)
      } else {
        setWatchProviders(null)
      }
    }

    loadRelatedData()
    loadProviders()
  }, [currentMovie])

  const getImageUrl = (movie: typeof currentMovie) => {
    if (!movie) return ''
    if (movie.image) return movie.image

    const cleanName = movie.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')

    return `/image/${cleanName}.jpg`
  }

  const handleImageError = (movieName: string) => {
    return `https://via.placeholder.com/600x800/006b3c/ffd700?text=${encodeURIComponent(movieName)}`
  }

  return {
    currentMovie,
    loadingDetails,
    errorDetails,
    directorMovies,
    relatedByGenre,
    watchProviders,
    goTo,
    getImageUrl,
    handleImageError,
  }
}
