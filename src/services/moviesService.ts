import type { Movie, MoviesResponse, FilterOptions } from '../types'

// Função auxiliar para gerar caminho da imagem
const getImagePath = (movieName: string): string => {
  // Remove acentos e caracteres especiais, converte para minúsculas
  const normalizedName = movieName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
  
  // Retorna o caminho da imagem
  // Se a imagem não existir, o onError no componente usará placeholder
  return `/image/${normalizedName}.jpg`
}

// Dados mockados de filmes brasileiros famosos
const BRAZILIAN_MOVIES: Movie[] = [
  {
    id: 1,
    name: 'Cidade de Deus',
    model: '2002',
    director: 'Fernando Meirelles',
    genre: 'Drama',
    image: '/image/cidadededeus.png',
  },
  {
    id: 2,
    name: 'O Auto da Compadecida',
    model: '2000',
    director: 'Guel Arraes',
    genre: 'Comédia',
    image: '/image/autodacompadecida.jpg',
  },
  {
    id: 3,
    name: 'Central do Brasil',
    model: '1998',
    director: 'Walter Salles',
    genre: 'Drama',
    image: '/image/centraldobrasil.webp',
  },
  {
    id: 4,
    name: 'Tropa de Elite',
    model: '2007',
    director: 'José Padilha',
    genre: 'Ação',
    image: '/image/tropadeelite.jpg',
  },
  {
    id: 5,
    name: 'Dona Flor e Seus Dois Maridos',
    model: '1976',
    director: 'Bruno Barreto',
    genre: 'Comédia',
    image: '/image/donafloreseusdoismaridos.jpg',
  },
  {
    id: 6,
    name: 'Que Horas Ela Volta?',
    model: '2015',
    director: 'Anna Muylaert',
    genre: 'Drama',
    image: '/image/quehoraselavolta.jpg',
  },
  {
    id: 7,
    name: 'O Pagador de Promessas',
    model: '1962',
    director: 'Anselmo Duarte',
    genre: 'Drama',
    image: '/image/opagadordepromessas.jpg',
  },
  {
    id: 8,
    name: 'Bacurau',
    model: '2019',
    director: 'Kleber Mendonça Filho',
    genre: 'Suspense',
    image: '/image/bacurau.jpg',
  },
  {
    id: 9,
    name: 'Ainda Estou Aqui',
    model: '2025',
    director: 'Marcos Prado',
    genre: 'Drama',
    image: '/image/aindaestouaqui.jpg',
  },
  {
    id: 10,
    name: 'Carandiru',
    model: '2002',
    director: 'Hector Babenco',
    genre: 'Drama',
    image: '/image/carandiru.webp',
  },
  {
    id: 11,
    name: 'Lisbela e o Prisioneiro',
    model: '2003',
    director: 'Guel Arraes',
    genre: 'Comédia',
    image: '/image/lisbelaeoprisioneiro.jpg',
  },
  {
    id: 12,
    name: 'O Homem que Copiava',
    model: '2003',
    director: 'Jorge Furtado',
    genre: 'Comédia',
    image: '/image/ohomemquecopiava.jpg',
  },
  {
    id: 13,
    name: 'Estômago',
    model: '2007',
    director: 'Marcos Jorge',
    genre: 'Drama',
    image: '/image/estomago.jpg',
  },
  {
    id: 14,
    name: 'O Palhaço',
    model: '2011',
    director: 'Selton Mello',
    genre: 'Comédia',
    image: '/image/opalhaco.jpeg',
  },
  {
    id: 15,
    name: 'O Agente Secreto',
    model: '2025',
    director: 'Kleber Mendonça Filho',
    genre: 'Romance',
    image: '/image/oagente.jpg',
  },
]

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))


export const fetchMovies = async (page: number = 1): Promise<MoviesResponse> => {
  try {
    // Simula delay de rede
    await delay(500)

    const itemsPerPage = 10
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

/**
 * Busca detalhes de um filme específico
 * @param id - ID do filme
 * @returns Detalhes do filme
 */
export const fetchMovieById = async (id: string | number): Promise<Movie> => {
  try {
    await delay(300)

    const movie = BRAZILIAN_MOVIES.find((m) => m.id === parseInt(String(id)))

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
export const getFilterOptions = (): FilterOptions => {
  const genres = [...new Set(BRAZILIAN_MOVIES.map((movie) => movie.genre))].sort()
  const years = [...new Set(BRAZILIAN_MOVIES.map((movie) => movie.model))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  )

  return {
    genres: genres.map((genre) => ({ value: genre, label: genre })),
    years: years.map((year) => ({ value: year, label: year })),
  }
}

