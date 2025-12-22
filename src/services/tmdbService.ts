import { TMDB_API_KEY, TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL, BRAZILIAN_MOVIES_SEARCH_TERMS } from '../config/tmdb'
import type { TMDBMovieResponse, TMDBSearchResponse, Movie } from '../types'

/**
 * Busca diretor de um filme no TMDb
 * @param movieId - ID do filme no TMDb
 * @returns Nome do diretor ou null
 */
const fetchDirectorFromTMDB = async (movieId: number): Promise<string | null> => {
  if (!TMDB_API_KEY) {
    return null
  }

  try {
    const response = await fetch(
      `${TMDB_API_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=pt-BR`
    )
    
    if (!response.ok) {
      return null
    }

    const credits = await response.json()
    const directorData = credits.crew?.find((person: any) => person.job === 'Director')
    
    return directorData?.name || null
  } catch (error) {
    return null
  }
}

/**
 * Busca um filme no TMDb por título
 * @param title - Título do filme
 * @param year - Ano do filme (opcional)
 * @returns Dados do filme do TMDb com diretor
 */
export const searchMovieInTMDB = async (title: string, year?: number): Promise<{ movie: TMDBMovieResponse; director: string } | null> => {
  if (!TMDB_API_KEY) {
    return null
  }

  try {
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      query: title,
      language: 'pt-BR',
      include_adult: 'false',
    })

    if (year) {
      params.append('year', year.toString())
      params.append('primary_release_year', year.toString())
    }

    const response = await fetch(`${TMDB_API_BASE_URL}/search/movie?${params.toString()}`)

    if (!response.ok) {
      if (response.status === 401) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TMDBSearchResponse = await response.json()

    if (!data.results || data.results.length === 0) {
      return null
    }

    // Pega o primeiro resultado
    const bestMatch = data.results[0]

    // Busca detalhes completos do filme
    const movieDetails = await fetchMovieDetailsFromTMDB(bestMatch.id)
    
    if (!movieDetails) {
      return null
    }

    // Busca diretor
    const director = await fetchDirectorFromTMDB(bestMatch.id) || 'Desconhecido'

    return { movie: movieDetails, director }
  } catch (error) {
    if (error instanceof Error && !error.message.includes('401')) {
      console.error(`Erro ao buscar filme no TMDb: ${title}`, error)
    }
    return null
  }
}

/**
 * Busca detalhes completos de um filme no TMDb por ID
 * @param movieId - ID do filme no TMDb
 * @returns Dados completos do filme
 */
export const fetchMovieDetailsFromTMDB = async (movieId: number): Promise<TMDBMovieResponse | null> => {
  if (!TMDB_API_KEY) {
    return null
  }

  try {
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: 'pt-BR',
    })

    const response = await fetch(`${TMDB_API_BASE_URL}/movie/${movieId}?${params.toString()}`)

    if (!response.ok) {
      if (response.status === 401) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TMDBMovieResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error && !error.message.includes('401')) {
      console.error(`Erro ao buscar detalhes do filme no TMDb: ${movieId}`, error)
    }
    return null
  }
}

/**
 * Busca filmes brasileiros usando discover API
 * @param limit - Número máximo de filmes a retornar
 * @returns Array de filmes brasileiros
 */
export const discoverBrazilianMovies = async (limit: number = 20): Promise<TMDBMovieResponse[]> => {
  if (!TMDB_API_KEY) {
    return []
  }

  try {
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: 'pt-BR',
      with_origin_country: 'BR',
      sort_by: 'popularity.desc',
      page: '1',
    })

    const response = await fetch(`${TMDB_API_BASE_URL}/discover/movie?${params.toString()}`)

    if (!response.ok) {
      if (response.status === 401) {
        return []
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TMDBSearchResponse = await response.json()
    
    // Busca detalhes completos de cada filme
    const movies: TMDBMovieResponse[] = []
    for (const movie of data.results.slice(0, limit)) {
      const details = await fetchMovieDetailsFromTMDB(movie.id)
      if (details) {
        movies.push(details)
      }
      // Pequeno delay para evitar rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    return movies
  } catch (error) {
    if (error instanceof Error && !error.message.includes('401')) {
      console.error('Erro ao descobrir filmes brasileiros no TMDb', error)
    }
    return []
  }
}

/**
 * Mapeia resposta do TMDb para o formato Movie usado na aplicação
 * @param tmdbMovie - Dados do filme do TMDb
 * @param director - Nome do diretor
 * @param id - ID numérico para uso interno
 * @returns Filme no formato Movie
 */
export const mapTMDBToMovie = (tmdbMovie: TMDBMovieResponse, director: string, id: number): Movie => {
  // Extrai o primeiro gênero
  const genre = tmdbMovie.genres && tmdbMovie.genres.length > 0 
    ? tmdbMovie.genres[0].name 
    : 'Desconhecido'

  // Extrai o ano da data de lançamento
  const year = tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear().toString() : 'N/A'

  // Verifica se foi premiado (filmes com boa avaliação são considerados premiados)
  const hasAwards = tmdbMovie.vote_average >= 7.0

  // Constrói URL da imagem do poster
  const imageUrl = tmdbMovie.poster_path 
    ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}` 
    : undefined

  return {
    id,
    name: tmdbMovie.title,
    model: year,
    director: director || 'Desconhecido',
    genre,
    image: imageUrl,
    awarded: hasAwards,
    imdbID: tmdbMovie.imdb_id || undefined,
  }
}

/**
 * Busca todos os filmes brasileiros da lista no TMDb
 * @returns Array de filmes
 */
export const fetchAllBrazilianMoviesFromTMDB = async (): Promise<Movie[]> => {
  if (!TMDB_API_KEY) {
    return []
  }

  const movies: Movie[] = []
  
  // Busca cada filme sequencialmente para evitar rate limiting
  for (let i = 0; i < BRAZILIAN_MOVIES_SEARCH_TERMS.length; i++) {
    const { name, year } = BRAZILIAN_MOVIES_SEARCH_TERMS[i]
    const result = await searchMovieInTMDB(name, year)
    
    if (result) {
      const movie = mapTMDBToMovie(result.movie, result.director, i + 1)
      movies.push(movie)
    }
    
    // Pequeno delay para evitar rate limiting
    if (i < BRAZILIAN_MOVIES_SEARCH_TERMS.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }

  return movies
}

