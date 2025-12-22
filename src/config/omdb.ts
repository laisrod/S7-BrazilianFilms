// Configuração da API OMDb
// Para obter uma API key gratuita, acesse: http://www.omdbapi.com/apikey.aspx

const rawApiKey = import.meta.env.VITE_OMDB_API_KEY || ''

// Valida se a API key está configurada (não é valor padrão/exemplo)
export const OMDB_API_KEY = rawApiKey && 
  rawApiKey !== 'your_api_key_here' && 
  rawApiKey.trim().length > 0 
  ? rawApiKey.trim() 
  : ''

export const OMDB_API_BASE_URL = 'http://www.omdbapi.com/'
export const OMDB_POSTER_API_URL = 'http://img.omdbapi.com/'

// Lista de filmes brasileiros para buscar na API OMDb
export const BRAZILIAN_MOVIES_SEARCH_TERMS = [
  { name: 'Cidade de Deus', year: '2002' },
  { name: 'O Auto da Compadecida', year: '2000' },
  { name: 'Central do Brasil', year: '1998' },
  { name: 'Tropa de Elite', year: '2007' },
  { name: 'Dona Flor e Seus Dois Maridos', year: '1976' },
  { name: 'Que Horas Ela Volta?', year: '2015' },
  { name: 'O Pagador de Promessas', year: '1962' },
  { name: 'Bacurau', year: '2019' },
  { name: 'Carandiru', year: '2002' },
  { name: 'Lisbela e o Prisioneiro', year: '2003' },
  { name: 'O Homem que Copiava', year: '2003' },
  { name: 'Estômago', year: '2007' },
  { name: 'O Palhaço', year: '2011' },
]

