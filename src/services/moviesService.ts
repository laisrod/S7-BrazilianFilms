import type { Movie, MoviesResponse, FilterOptions } from '../types'
import { fetchAllBrazilianMoviesFromOMDb, fetchMovieByIMDbId, mapOMDbToMovie } from './omdbService'
import { fetchAllBrazilianMoviesFromTMDB } from './tmdbService'
import { OMDB_API_KEY } from '../config/omdb'
import { TMDB_API_KEY } from '../config/tmdb'

// Cache para filmes buscados da API
let cachedMovies: Movie[] | null = null

/**
 * Limpa o cache de filmes (útil para forçar nova busca)
 */
export const clearMoviesCache = () => {
  cachedMovies = null
}

// Dados mockados de filmes brasileiros famosos (fallback)
const BRAZILIAN_MOVIES: Movie[] = [
  {
    id: 1,
    name: 'Cidade de Deus',
    model: '2002',
    director: 'Fernando Meirelles',
    genre: 'Drama',
    image: '/image/cidadededeus.png',
    awarded: true,
  },
  {
    id: 2,
    name: 'O Auto da Compadecida',
    model: '2000',
    director: 'Guel Arraes',
    genre: 'Comédia',
    image: '/image/autodacompadecida.jpg',
    awarded: true,
  },
  {
    id: 3,
    name: 'Central do Brasil',
    model: '1998',
    director: 'Walter Salles',
    genre: 'Drama',
    image: '/image/centraldobrasil.webp',
    awarded: true,
  },
  {
    id: 4,
    name: 'Tropa de Elite',
    model: '2007',
    director: 'José Padilha',
    genre: 'Ação',
    image: '/image/tropadeelite.jpg',
    awarded: true,
  },
  {
    id: 5,
    name: 'Dona Flor e Seus Dois Maridos',
    model: '1976',
    director: 'Bruno Barreto',
    genre: 'Comédia',
    image: '/image/donafloreseusdoismaridos.jpg',
    awarded: false,
  },
  {
    id: 6,
    name: 'Que Horas Ela Volta?',
    model: '2015',
    director: 'Anna Muylaert',
    genre: 'Drama',
    image: '/image/quehoraselavolta.jpg',
    awarded: true,
  },
  {
    id: 7,
    name: 'O Pagador de Promessas',
    model: '1962',
    director: 'Anselmo Duarte',
    genre: 'Drama',
    image: '/image/opagadordepromessas.jpg',
    awarded: true,
  },
  {
    id: 8,
    name: 'Bacurau',
    model: '2019',
    director: 'Kleber Mendonça Filho',
    genre: 'Suspense',
    image: '/image/bacurau.jpg',
    awarded: true,
  },
  {
    id: 9,
    name: 'Ainda Estou Aqui',
    model: '2025',
    director: 'Marcos Prado',
    genre: 'Drama',
    image: '/image/aindaestouaqui.jpg',
    awarded: true,
  },
  {
    id: 10,
    name: 'Carandiru',
    model: '2002',
    director: 'Hector Babenco',
    genre: 'Drama',
    image: '/image/carandiru.webp',
    awarded: true,
  },
  {
    id: 11,
    name: 'Lisbela e o Prisioneiro',
    model: '2003',
    director: 'Guel Arraes',
    genre: 'Comédia',
    image: '/image/lisbelaeoprisioneiro.jpg',
    awarded: false,
  },
  {
    id: 12,
    name: 'O Homem que Copiava',
    model: '2003',
    director: 'Jorge Furtado',
    genre: 'Comédia',
    image: '/image/ohomemquecopiava.jpg',
    awarded: false,
  },
  {
    id: 13,
    name: 'Estômago',
    model: '2007',
    director: 'Marcos Jorge',
    genre: 'Drama',
    image: '/image/estomago.jpg',
    awarded: false,
  },
  {
    id: 14,
    name: 'O Palhaço',
    model: '2011',
    director: 'Selton Mello',
    genre: 'Comédia',
    image: '/image/opalhaco.jpeg',
    awarded: false,
  },
  {
    id: 15,
    name: 'O Agente Secreto',
    model: '2025',
    director: 'Kleber Mendonça Filho',
    genre: 'Romance',
    image: '/image/oagente.jpg',
    awarded: true,
  },
]

/**
 * Obtém lista de filmes (da API OMDb ou fallback mockado)
 */
const getMoviesList = async (): Promise<Movie[]> => {
  // Se já temos cache válido (com pelo menos 5 filmes), retorna
  if (cachedMovies && cachedMovies.length >= 5) {
    return cachedMovies
  }

  // Prioridade: TMDb > OMDb > Mockados
  // Tenta buscar da API TMDb primeiro (melhor cobertura de filmes brasileiros)
  if (TMDB_API_KEY) {
    try {
      const tmdbMovies = await fetchAllBrazilianMoviesFromTMDB()
      // Só usa dados da API se encontrar pelo menos 5 filmes (garante qualidade)
      if (tmdbMovies.length >= 5) {
        cachedMovies = tmdbMovies
        return tmdbMovies
      }
    } catch (error) {
      // Silenciosamente tenta outras fontes
    }
  }

  // Fallback para OMDb se TMDb não estiver disponível ou não encontrar muitos filmes
  if (OMDB_API_KEY) {
    try {
      const omdbMovies = await fetchAllBrazilianMoviesFromOMDb()
      // Só usa dados da API se encontrar pelo menos 5 filmes (garante qualidade)
      if (omdbMovies.length >= 5) {
        cachedMovies = omdbMovies
        return omdbMovies
      }
    } catch (error) {
      // Silenciosamente usa fallback para dados mockados
    }
  }

  // Fallback para dados mockados
  return BRAZILIAN_MOVIES
}

export const fetchMovies = async (page: number = 1): Promise<MoviesResponse> => {
  try {
    const allMovies = await getMoviesList()
    
    const itemsPerPage = 8
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedMovies = allMovies.slice(startIndex, endIndex)

    const totalPages = Math.ceil(allMovies.length / itemsPerPage)

    return {
      results: paginatedMovies,
      count: allMovies.length,
      next: page < totalPages ? page + 1 : null,
      previous: page > 1 ? page - 1 : null,
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    throw error
  }
}

/**
 * Busca detalhes de um filme específico
 * @param id - ID do filme ou IMDb ID
 * @returns Detalhes do filme
 */
export const fetchMovieById = async (id: string | number): Promise<Movie> => {
  try {
    // Primeiro tenta buscar da lista em cache/mockada
    const allMovies = await getMoviesList()
    const numericId = parseInt(String(id))
    let movie = allMovies.find((m) => m.id === numericId)

    // Se não encontrou e o ID parece ser um IMDb ID (começa com 'tt'), tenta buscar nas APIs
    if (!movie && String(id).startsWith('tt')) {
      // Tenta TMDb primeiro (melhor para filmes brasileiros)
      if (TMDB_API_KEY) {
        try {
          // TMDb não busca direto por IMDb ID, então tentamos OMDb
          const omdbMovie = await fetchMovieByIMDbId(String(id))
          if (omdbMovie) {
            movie = mapOMDbToMovie(omdbMovie, numericId || Date.now())
          }
        } catch (error) {
          // Ignora erro
        }
      } else if (OMDB_API_KEY) {
        const omdbMovie = await fetchMovieByIMDbId(String(id))
        if (omdbMovie) {
          movie = mapOMDbToMovie(omdbMovie, numericId || Date.now())
        }
      }
    }

    // Se ainda não encontrou, tenta buscar na lista mockada como fallback
    if (!movie) {
      movie = BRAZILIAN_MOVIES.find((m) => m.id === numericId)
    }

    if (!movie) {
      throw new Error('Filme não encontrado')
    }

    return movie
  } catch (error) {
    console.error('Erro ao buscar filme:', error)
    throw error
  }
}

/**
 * Obtém opções de filtros disponíveis (gêneros e anos únicos)
 * @returns Objeto com arrays de opções de gêneros e anos
 */
export const getFilterOptions = async (): Promise<FilterOptions> => {
  const allMovies = await getMoviesList()
  
  const genres = [...new Set(allMovies.map((movie) => movie.genre))].sort()
  const years = [...new Set(allMovies.map((movie) => movie.model))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  )

  return {
    genres: genres.map((genre) => ({ value: genre, label: genre })),
    years: years.map((year) => ({ value: year, label: year })),
    awarded: [
      { value: 'true', label: 'Premiados' },
      { value: 'false', label: 'Não premiados' },
    ],
  }
}

/**
 * Busca filmes relacionados por diretor (excluindo o filme atual)
 * @param director - Nome do diretor
 * @param excludeId - ID do filme a excluir
 * @returns Array de filmes do mesmo diretor
 */
export const getMoviesByDirector = async (director: string, excludeId?: number): Promise<Movie[]> => {
  const allMovies = await getMoviesList()
  return allMovies.filter(
    (movie) => movie.director === director && movie.id !== excludeId
  )
}

/**
 * Busca filmes relacionados por gênero (excluindo o filme atual)
 * @param genre - Gênero do filme
 * @param excludeId - ID do filme a excluir
 * @param limit - Limite de filmes a retornar (padrão: 3)
 * @returns Array de filmes do mesmo gênero
 */
export const getMoviesByGenre = async (
  genre: string,
  excludeId?: number,
  limit: number = 3
): Promise<Movie[]> => {
  const allMovies = await getMoviesList()
  return allMovies.filter(
    (movie) => movie.genre === genre && movie.id !== excludeId
  ).slice(0, limit)
}

/**
 * Busca todos os filmes (para uso em componentes que precisam de todos os dados)
 * @returns Array com todos os filmes
 */
export const getAllMovies = async (): Promise<Movie[]> => {
  return await getMoviesList()
}

