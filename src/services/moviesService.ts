import type { Movie, MoviesResponse, FilterOptions } from '../types'
import { fetchAllBrazilianMoviesFromOMDb, fetchMovieByIMDbId, mapOMDbToMovie } from './omdbService'
import { fetchAllBrazilianMoviesFromTMDB, discoverBrazilianMovies, mapTMDBToMovie } from './tmdbService'
import { OMDB_API_KEY } from '../config/omdb'
import { TMDB_API_KEY } from '../config/tmdb'

let cachedMovies: Movie[] | null = null

export const clearMoviesCache = () => {
  cachedMovies = null
}

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

const getMoviesList = async (): Promise<Movie[]> => {
  if (cachedMovies && cachedMovies.length >= 5) {
    return cachedMovies
  }

  if (TMDB_API_KEY) {
    try {
      const discoverResults = await discoverBrazilianMovies(100)
      if (discoverResults.length > 0) {
        const movies: Movie[] = discoverResults.map((result, index) => 
          mapTMDBToMovie(result.movie, result.director, index + 1)
        )
        cachedMovies = movies
        return movies
      }
      
      const tmdbMovies = await fetchAllBrazilianMoviesFromTMDB()
      if (tmdbMovies.length >= 5) {
        cachedMovies = tmdbMovies
        return tmdbMovies
      }
    } catch (error) {
    }
  }

  if (OMDB_API_KEY) {
    try {
      const omdbMovies = await fetchAllBrazilianMoviesFromOMDb()
      if (omdbMovies.length >= 5) {
        cachedMovies = omdbMovies
        return omdbMovies
      }
    } catch (error) {
    }
  }

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

export const fetchMovieById = async (id: string | number): Promise<Movie> => {
  try {
    const allMovies = await getMoviesList()
    const numericId = parseInt(String(id))
    let movie = allMovies.find((m) => m.id === numericId)

    if (!movie && String(id).startsWith('tt')) {
      if (TMDB_API_KEY) {
        try {
          const omdbMovie = await fetchMovieByIMDbId(String(id))
          if (omdbMovie) {
            movie = mapOMDbToMovie(omdbMovie, numericId || Date.now())
          }
        } catch (error) {
        }
      } else if (OMDB_API_KEY) {
        const omdbMovie = await fetchMovieByIMDbId(String(id))
        if (omdbMovie) {
          movie = mapOMDbToMovie(omdbMovie, numericId || Date.now())
        }
      }
    }

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

export const getMoviesByDirector = async (director: string, excludeId?: number): Promise<Movie[]> => {
  const allMovies = await getMoviesList()
  return allMovies.filter(
    (movie) => movie.director === director && movie.id !== excludeId
  )
}

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

export const getAllMovies = async (): Promise<Movie[]> => {
  return await getMoviesList()
}

