// Dados mockados de filmes brasileiros famosos
const BRAZILIAN_MOVIES = [
  {
    id: 1,
    name: 'Cidade de Deus',
    model: '2002',
    director: 'Fernando Meirelles',
    genre: 'Drama',
  },
  {
    id: 2,
    name: 'O Auto da Compadecida',
    model: '2000',
    director: 'Guel Arraes',
    genre: 'Comédia',
  },
  {
    id: 3,
    name: 'Central do Brasil',
    model: '1998',
    director: 'Walter Salles',
    genre: 'Drama',
  },
  {
    id: 4,
    name: 'Tropa de Elite',
    model: '2007',
    director: 'José Padilha',
    genre: 'Ação',
  },
  {
    id: 5,
    name: 'Dona Flor e Seus Dois Maridos',
    model: '1976',
    director: 'Bruno Barreto',
    genre: 'Comédia',
  },
  {
    id: 6,
    name: 'Que Horas Ela Volta?',
    model: '2015',
    director: 'Anna Muylaert',
    genre: 'Drama',
  },
  {
    id: 7,
    name: 'O Pagador de Promessas',
    model: '1962',
    director: 'Anselmo Duarte',
    genre: 'Drama',
  },
  {
    id: 8,
    name: 'Bacurau',
    model: '2019',
    director: 'Kleber Mendonça Filho',
    genre: 'Suspense',
  },
  {
    id: 9,
    name: 'O Que É Isso, Companheiro?',
    model: '1997',
    director: 'Bruno Barreto',
    genre: 'Drama',
  },
  {
    id: 10,
    name: 'Carandiru',
    model: '2002',
    director: 'Hector Babenco',
    genre: 'Drama',
  },
  {
    id: 11,
    name: 'Lisbela e o Prisioneiro',
    model: '2003',
    director: 'Guel Arraes',
    genre: 'Comédia',
  },
  {
    id: 12,
    name: 'O Homem que Copiava',
    model: '2003',
    director: 'Jorge Furtado',
    genre: 'Comédia',
  },
  {
    id: 13,
    name: 'Estômago',
    model: '2007',
    director: 'Marcos Jorge',
    genre: 'Drama',
  },
  {
    id: 14,
    name: 'O Palhaço',
    model: '2011',
    director: 'Selton Mello',
    genre: 'Comédia',
  },
  {
    id: 15,
    name: 'Hoje Eu Quero Voltar Sozinho',
    model: '2014',
    director: 'Daniel Ribeiro',
    genre: 'Romance',
  },
]

/**
 * Simula uma chamada de API com delay
 * @param {number} ms - Milissegundos de delay
 * @returns {Promise}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Busca lista de filmes brasileiros
 * @param {number} page - Número da página (padrão: 1)
 * @returns {Promise<Object>} - Resposta com lista de filmes
 */
export const fetchMovies = async (page = 1) => {
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
 * @param {string} id - ID do filme
 * @returns {Promise<Object>} - Detalhes do filme
 */
export const fetchMovieById = async (id) => {
  try {
    await delay(300)

    const movie = BRAZILIAN_MOVIES.find((m) => m.id === parseInt(id))

    if (!movie) {
      throw new Error('Filme não encontrado')
    }

    return movie
  } catch (error) {
    console.error('Erro ao buscar filme:', error)
    throw error
  }
}

