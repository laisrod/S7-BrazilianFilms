import { OMDB_API_KEY, OMDB_API_BASE_URL, BRAZILIAN_MOVIES_SEARCH_TERMS } from '../config/omdb'
import type { OMDBMovieResponse, OMDBSearchResponse, Movie } from '../types'

/**
 * Busca um filme na API OMDb por título
 * @param title - Título do filme
 * @param year - Ano do filme (opcional)
 * @returns Dados do filme da API OMDb
 */
export const fetchMovieFromOMDb = async (title: string, year?: string): Promise<OMDBMovieResponse | null> => {
  if (!OMDB_API_KEY) {
    // Não loga aviso para evitar spam no console quando API key não está configurada
    return null
  }

  try {
    const params = new URLSearchParams({
      apikey: OMDB_API_KEY,
      t: title,
      plot: 'short',
      r: 'json',
    })

    if (year) {
      params.append('y', year)
    }

    const response = await fetch(`${OMDB_API_BASE_URL}?${params.toString()}`)

    if (!response.ok) {
      // Se for 401 (Unauthorized), a API key é inválida - não loga erro repetitivo
      if (response.status === 401) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: OMDBMovieResponse = await response.json()

    if (data.Response === 'False' || data.Error) {
      // Não loga avisos para filmes não encontrados (comum para filmes brasileiros)
      return null
    }

    return data
  } catch (error) {
    // Só loga erro se não for 401 (API key inválida já foi tratada acima)
    if (error instanceof Error && !error.message.includes('401')) {
      console.error(`Erro ao buscar filme na OMDb: ${title}`, error)
    }
    return null
  }
}

/**
 * Busca um filme na API OMDb por IMDb ID
 * @param imdbID - ID do IMDb
 * @returns Dados do filme da API OMDb
 */
export const fetchMovieByIMDbId = async (imdbID: string): Promise<OMDBMovieResponse | null> => {
  if (!OMDB_API_KEY) {
    return null
  }

  try {
    const params = new URLSearchParams({
      apikey: OMDB_API_KEY,
      i: imdbID,
      plot: 'full',
      r: 'json',
    })

    const response = await fetch(`${OMDB_API_BASE_URL}?${params.toString()}`)

    if (!response.ok) {
      if (response.status === 401) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: OMDBMovieResponse = await response.json()

    if (data.Response === 'False' || data.Error) {
      return null
    }

    return data
  } catch (error) {
    if (error instanceof Error && !error.message.includes('401')) {
      console.error(`Erro ao buscar filme na OMDb por ID: ${imdbID}`, error)
    }
    return null
  }
}

/**
 * Mapeia resposta da API OMDb para o formato Movie usado na aplicação
 * @param omdbMovie - Dados do filme da API OMDb
 * @param id - ID numérico para uso interno
 * @returns Filme no formato Movie
 */
export const mapOMDbToMovie = (omdbMovie: OMDBMovieResponse, id: number): Movie => {
  // Extrai o primeiro gênero (API retorna "Drama, Crime" por exemplo)
  const genre = omdbMovie.Genre ? omdbMovie.Genre.split(',')[0].trim() : 'Unknown'

  // Verifica se foi premiado baseado no campo Awards
  const hasAwards = Boolean(omdbMovie.Awards && omdbMovie.Awards !== 'N/A' && omdbMovie.Awards.trim().length > 0)

  return {
    id,
    name: omdbMovie.Title,
    model: omdbMovie.Year,
    director: omdbMovie.Director || 'Unknown',
    genre,
    image: omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : undefined,
    awarded: hasAwards,
    imdbID: omdbMovie.imdbID,
  }
}

/**
 * Busca todos os filmes brasileiros da lista na API OMDb
 * @returns Array de filmes
 */
export const fetchAllBrazilianMoviesFromOMDb = async (): Promise<Movie[]> => {
  if (!OMDB_API_KEY) {
    return []
  }

  const movies: Movie[] = []
  
  // Busca cada filme sequencialmente para evitar rate limiting
  for (let i = 0; i < BRAZILIAN_MOVIES_SEARCH_TERMS.length; i++) {
    const { name, year } = BRAZILIAN_MOVIES_SEARCH_TERMS[i]
    const omdbMovie = await fetchMovieFromOMDb(name, year)
    
    if (omdbMovie) {
      const movie = mapOMDbToMovie(omdbMovie, i + 1)
      movies.push(movie)
    }
    
    // Pequeno delay para evitar rate limiting
    if (i < BRAZILIAN_MOVIES_SEARCH_TERMS.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
  }

  return movies
}

