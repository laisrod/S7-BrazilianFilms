import type { Movie, MoviesResponse, FilterOptions } from '../types'
import { TMDB_API_KEY, TMDB_API_BASE_URL, TMDB_IMAGE_BASE_URL } from '../config/tmdb'

// ===== FUNÇÕES AUXILIARES =====

// Monta URLs da API TMDb
const buildUrl = (endpoint: string, extraParams: Record<string, string> = {}) => {
  const params = new URLSearchParams()
  params.append('api_key', TMDB_API_KEY || '')
  params.append('language', 'pt-BR')

  for (const key in extraParams) {
    params.append(key, extraParams[key])
  }

  return `${TMDB_API_BASE_URL}${endpoint}?${params.toString()}`
}

// Faz requisição HTTP para a API TMDb
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

    return await response.json()
  } catch (error) {
    if (error instanceof Error && !error.message.includes('401')) {
      console.error('Erro na requisição:', error)
    }
    return null
  }
}

// Mapa de IDs de gêneros TMDb para nomes em PT-BR
const GENRE_MAP: Record<number, string> = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção Científica',
  10770: 'Filme para TV',
  53: 'Suspense',
  10752: 'Guerra',
  37: 'Faroeste',
}

// ===== BUSCA DE FILMES BRASILEIROS VIA DISCOVER =====

// Busca filmes brasileiros paginados diretamente da API TMDb
const fetchBrazilianMoviesFromTMDB = async (page: number = 1) => {
  const url = buildUrl('/discover/movie', {
    with_original_language: 'pt',
    'with_origin_country': 'BR',
    sort_by: 'vote_count.desc',
    'vote_count.gte': '50',
    page: page.toString(),
  })

  const data = await makeRequest(url)
  if (!data || !data.results) {
    return null
  }

  const movies: Movie[] = data.results.map((item: any, index: number) => {
    const genreId = item.genre_ids?.[0]
    const genre = genreId ? (GENRE_MAP[genreId] || 'Outro') : 'Desconhecido'

    let year = 'N/A'
    if (item.release_date) {
      year = new Date(item.release_date).getFullYear().toString()
    }

    return {
      id: (page - 1) * 20 + index + 1,
      name: item.title,
      model: year,
      director: '',
      genre,
      image: item.poster_path ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` : undefined,
      awarded: item.vote_average >= 7.0,
      tmdbId: item.id,
    }
  })

  return {
    movies,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  }
}

// Busca diretor de um filme
const fetchDirectorFromTMDB = async (movieId: number): Promise<string> => {
  const url = buildUrl(`/movie/${movieId}/credits`)
  const credits = await makeRequest(url)

  if (!credits?.crew) return 'Desconhecido'

  const director = credits.crew.find((person: any) => person.job === 'Director')
  return director?.name || 'Desconhecido'
}

// Busca detalhes de um filme específico pelo tmdbId
const fetchMovieDetailsFromTMDB = async (tmdbId: number) => {
  const url = buildUrl(`/movie/${tmdbId}`)
  return await makeRequest(url)
}

// ===== BUSCA DE ONDE ASSISTIR =====

export const fetchWatchProviders = async (movieId: number) => {
  const url = buildUrl(`/movie/${movieId}/watch/providers`)
  return await makeRequest(url)
}

// Busca filme por nome (usada na pesquisa)
export const searchMovieInTMDB = async (title: string, year?: number) => {
  const params: Record<string, string> = {
    query: title,
    include_adult: 'false',
    ...(year && { year: year.toString(), primary_release_year: year.toString() }),
  }

  const data = await makeRequest(buildUrl('/search/movie', params))
  const bestMatch = data?.results?.[0]

  if (!bestMatch) return null

  const movieDetails = await fetchMovieDetailsFromTMDB(bestMatch.id)
  if (!movieDetails) return null

  const director = await fetchDirectorFromTMDB(bestMatch.id)

  return { movie: movieDetails, director: director || 'Desconhecido' }
}

// ===== LISTA ESTÁTICA (FALLBACK) =====

const BRAZILIAN_MOVIES: Movie[] = [
  { id: 1, name: 'Cidade de Deus', model: '2002', director: 'Fernando Meirelles', genre: 'Drama', image: '/image/cidadededeus.png', awarded: true },
  { id: 2, name: 'O Auto da Compadecida', model: '2000', director: 'Guel Arraes', genre: 'Comédia', image: '/image/autodacompadecida.jpg', awarded: true },
  { id: 3, name: 'Central do Brasil', model: '1998', director: 'Walter Salles', genre: 'Drama', image: '/image/centraldobrasil.webp', awarded: true },
  { id: 4, name: 'Tropa de Elite', model: '2007', director: 'José Padilha', genre: 'Ação', image: '/image/tropadeelite.jpg', awarded: true },
  { id: 5, name: 'Dona Flor e Seus Dois Maridos', model: '1976', director: 'Bruno Barreto', genre: 'Comédia', image: '/image/donafloreseusdoismaridos.jpg', awarded: false },
  { id: 6, name: 'Que Horas Ela Volta?', model: '2015', director: 'Anna Muylaert', genre: 'Drama', image: '/image/quehoraselavolta.jpg', awarded: true },
  { id: 7, name: 'O Pagador de Promessas', model: '1962', director: 'Anselmo Duarte', genre: 'Drama', image: '/image/opagadordepromessas.jpg', awarded: true },
  { id: 8, name: 'Bacurau', model: '2019', director: 'Kleber Mendonça Filho', genre: 'Suspense', image: '/image/bacurau.jpg', awarded: true },
  { id: 9, name: 'Ainda Estou Aqui', model: '2025', director: 'Marcos Prado', genre: 'Drama', image: '/image/aindaestouaqui.jpg', awarded: true },
  { id: 10, name: 'Carandiru', model: '2002', director: 'Hector Babenco', genre: 'Drama', image: '/image/carandiru.webp', awarded: true },
  { id: 11, name: 'Lisbela e o Prisioneiro', model: '2003', director: 'Guel Arraes', genre: 'Comédia', image: '/image/lisbelaeoprisioneiro.jpg', awarded: false },
  { id: 12, name: 'O Homem que Copiava', model: '2003', director: 'Jorge Furtado', genre: 'Comédia', image: '/image/ohomemquecopiava.jpg', awarded: false },
  { id: 13, name: 'Estômago', model: '2007', director: 'Marcos Jorge', genre: 'Drama', image: '/image/estomago.jpg', awarded: false },
  { id: 14, name: 'O Palhaço', model: '2011', director: 'Selton Mello', genre: 'Comédia', image: '/image/opalhaco.jpeg', awarded: false },
  { id: 15, name: 'O Agente Secreto', model: '2025', director: 'Kleber Mendonça Filho', genre: 'Romance', image: '/image/oagente.jpg', awarded: true },
]

// ===== FUNÇÕES DE NEGÓCIO =====

// Retorna filmes paginados (TMDb ou fallback)
export const fetchMovies = async (page: number = 1): Promise<MoviesResponse> => {
  try {
    // Tenta buscar da API TMDb
    if (TMDB_API_KEY) {
      const tmdbResult = await fetchBrazilianMoviesFromTMDB(page)
      
      if (tmdbResult && tmdbResult.movies.length > 0) {
        // Busca diretores em paralelo para os filmes da página
        const moviesWithDirectors = await Promise.all(
          tmdbResult.movies.map(async (movie) => {
            if (movie.tmdbId) {
              const director = await fetchDirectorFromTMDB(movie.tmdbId)
              return { ...movie, director }
            }
            return movie
          })
        )

        return {
          results: moviesWithDirectors,
          count: tmdbResult.totalResults,
          next: page < tmdbResult.totalPages ? page + 1 : null,
          previous: page > 1 ? page - 1 : null,
        }
      }
    }

    // Fallback: lista estática paginada
    const itemsPerPage = 8
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedMovies = BRAZILIAN_MOVIES.slice(startIndex, endIndex)
    const totalPages = Math.ceil(BRAZILIAN_MOVIES.length / itemsPerPage)

    return {
      results: paginatedMovies,
      count: BRAZILIAN_MOVIES.length,
      next: page < totalPages ? page + 1 : null,
      previous: page > 1 ? page - 1 : null,
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    throw error
  }
}

// Busca um filme específico por id
export const fetchMovieById = async (id: string | number): Promise<Movie> => {
  try {
    const numericId = parseInt(String(id))

    // Tenta buscar da lista estática primeiro (por ID interno)
    const staticMovie = BRAZILIAN_MOVIES.find((m) => m.id === numericId)
    if (staticMovie) return staticMovie

    throw new Error('Filme não encontrado')
  } catch (error) {
    console.error('Erro ao buscar filme:', error)
    throw error
  }
}

// Gera opções de filtro dinamicamente
export const getFilterOptions = async (): Promise<FilterOptions> => {
  // Se tem API, busca a primeira página para gerar filtros
  if (TMDB_API_KEY) {
    const result = await fetchBrazilianMoviesFromTMDB(1)
    if (result && result.movies.length > 0) {
      const genres = [...new Set(result.movies.map((m) => m.genre))].sort()
      const years = [...new Set(result.movies.map((m) => m.model))].sort((a, b) => parseInt(b) - parseInt(a))

      return {
        genres: genres.map((g) => ({ value: g, label: g })),
        years: years.map((y) => ({ value: y, label: y })),
        awarded: [
          { value: 'true', label: 'Premiados' },
          { value: 'false', label: 'Não premiados' },
        ],
      }
    }
  }

  const genres = [...new Set(BRAZILIAN_MOVIES.map((m) => m.genre))].sort()
  const years = [...new Set(BRAZILIAN_MOVIES.map((m) => m.model))].sort((a, b) => parseInt(b) - parseInt(a))

  return {
    genres: genres.map((g) => ({ value: g, label: g })),
    years: years.map((y) => ({ value: y, label: y })),
    awarded: [
      { value: 'true', label: 'Premiados' },
      { value: 'false', label: 'Não premiados' },
    ],
  }
}

// Retorna filmes do mesmo diretor
export const getMoviesByDirector = async (director: string, excludeId?: number): Promise<Movie[]> => {
  return BRAZILIAN_MOVIES.filter(
    (movie) => movie.director === director && movie.id !== excludeId
  )
}

// Retorna filmes do mesmo gênero
export const getMoviesByGenre = async (
  genre: string,
  excludeId?: number,
  limit: number = 3
): Promise<Movie[]> => {
  return BRAZILIAN_MOVIES.filter(
    (movie) => movie.genre === genre && movie.id !== excludeId
  ).slice(0, limit)
}

// Retorna todos os filmes sem paginação
export const getAllMovies = async (): Promise<Movie[]> => {
  if (TMDB_API_KEY) {
    const result = await fetchBrazilianMoviesFromTMDB(1)
    if (result) return result.movies
  }
  return BRAZILIAN_MOVIES
}
