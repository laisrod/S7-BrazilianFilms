import { TMDB_API_KEY, TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL, BRAZILIAN_MOVIES_SEARCH_TERMS } from '../config/tmdb'
import type { TMDBMovieResponse, Movie } from '../types'

//espera
const wait = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

//faz requisição HTTP - Usada por todas as outras funções - toda a lógica de requisição
const makeRequest = async (url: string) => {
  if (!TMDB_API_KEY) {
    return null
  }

  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      if (response.status === 401) {
        return null
      }
      throw new Error(`Erro HTTP: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error && !error.message.includes('401')) {
      console.error('Erro na requisição:', error)
    }
    return null
  }
}

// monta URLs da API
const buildUrl = (endpoint: string, extraParams: Record<string, string> = {}) => {
  const params = new URLSearchParams()
  params.append('api_key', TMDB_API_KEY || '')
  params.append('language', 'pt-BR')

  for (const key in extraParams) {
    params.append(key, extraParams[key])
  }

  return `${TMDB_API_BASE_URL}${endpoint}?${params.toString()}`
}

// busca diretor de um filme
export const fetchDirectorFromTMDB = async (movieId: number) => {
  const url = buildUrl(`/movie/${movieId}/credits`)
  const credits = await makeRequest(url)
  
  if (!credits) {
    return null
  }

  if (!credits.crew) {
    return null
  }

  const director = credits.crew.find((person: any) => person.job === 'Director')
  
  if (!director) {
    return null
  }

  return director.name || null
}

// busca detalhes de um filme
export const fetchMovieDetailsFromTMDB = async (movieId: number) => {
  const url = buildUrl(`/movie/${movieId}`)
  return await makeRequest(url)
}

// busca filme por nome
export const searchMovieInTMDB = async (title: string, year?: number) => {
  const params: Record<string, string> = {
    query: title,
    include_adult: 'false',
  }

  if (year) {
    params.year = year.toString()
    params.primary_release_year = year.toString()
  }

  const url = buildUrl('/search/movie', params)
  const data = await makeRequest(url)

  if (!data) {
    return null
  }

  if (!data.results) {
    return null
  }

  if (data.results.length === 0) {
    return null
  }

  const bestMatch = data.results[0]
  const movieDetails = await fetchMovieDetailsFromTMDB(bestMatch.id)
  
  if (!movieDetails) {
    return null
  }

  const director = await fetchDirectorFromTMDB(bestMatch.id)
  const directorName = director || 'Desconhecido'

  return { movie: movieDetails, director: directorName }
}

// busca onde assistir o filme
export const fetchWatchProviders = async (movieId: number) => {
  const url = buildUrl(`/movie/${movieId}/watch/providers`)
  return await makeRequest(url)
}

// converte dados do TMDb para o formato da app
export const mapTMDBToMovie = (tmdbMovie: TMDBMovieResponse, director: string, id: number): Movie => {
  let genre = 'Desconhecido'
  if (tmdbMovie.genres && tmdbMovie.genres.length > 0) {
    genre = tmdbMovie.genres[0].name
  }

  let year = 'N/A'
  if (tmdbMovie.release_date) {
    const date = new Date(tmdbMovie.release_date)
    year = date.getFullYear().toString()
  }

  const hasAwards = tmdbMovie.vote_average >= 7.0

  let imageUrl = undefined
  if (tmdbMovie.poster_path) {
    imageUrl = `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}`
  }

  const directorName = director || 'Desconhecido'

  let imdbID = undefined
  if (tmdbMovie.imdb_id) {
    imdbID = tmdbMovie.imdb_id
  }

  return {
    id,
    name: tmdbMovie.title,
    model: year,
    director: directorName,
    genre,
    image: imageUrl,
    awarded: hasAwards,
    imdbID,
    tmdbId: tmdbMovie.id,
  }
}

// busca filmes brasileiros populares
export const discoverBrazilianMovies = async (limit: number = 100) => {
  if (!TMDB_API_KEY) {
    return []
  }

  const moviesPerPage = 20
  const pagesNeeded = Math.ceil(limit / moviesPerPage)
  const allMovies: Array<{ movie: TMDBMovieResponse; director: string }> = []

  for (let page = 1; page <= pagesNeeded; page++) {
    if (allMovies.length >= limit) {
      break
    }

    const url = buildUrl('/discover/movie', {
      with_origin_country: 'BR',
      sort_by: 'popularity.desc',
      page: page.toString(),
    })

    const data = await makeRequest(url)
    
    if (!data) {
      break
    }

    if (!data.results) {
      break
    }

    if (data.results.length === 0) {
      break
    }

    for (const movie of data.results) {
      if (allMovies.length >= limit) {
        break
      }

      const details = await fetchMovieDetailsFromTMDB(movie.id)
      
      if (details) {
        const director = await fetchDirectorFromTMDB(movie.id)
        const directorName = director || 'Desconhecido'
        allMovies.push({ movie: details, director: directorName })
      }

      await wait(100)
    }

    if (page < pagesNeeded && allMovies.length < limit) {
      await wait(200)
    }
  }

  return allMovies
}

// busca filmes brasileiros específicos
export const fetchAllBrazilianMoviesFromTMDB = async () => {
  if (!TMDB_API_KEY) {
    return []
  }

  const movies: Movie[] = []

  for (let i = 0; i < BRAZILIAN_MOVIES_SEARCH_TERMS.length; i++) {
    const movieTerm = BRAZILIAN_MOVIES_SEARCH_TERMS[i]
    const result = await searchMovieInTMDB(movieTerm.name, movieTerm.year)

    if (result) {
      const movie = mapTMDBToMovie(result.movie, result.director, i + 1)
      movies.push(movie)
    }

    const isNotLast = i < BRAZILIAN_MOVIES_SEARCH_TERMS.length - 1
    if (isNotLast) {
      await wait(300)
    }
  }

  return movies
}
