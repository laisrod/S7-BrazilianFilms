import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { fetchMovies, fetchMovieById } from '../../services/moviesService'
import type { Movie, MoviesState, Filters } from '../../types'

//funções auxiliares
//aplica filtros aos filmes
const applyFilters = (movies: Movie[], filters: Filters): Movie[] => {
  let filtered = [...movies]

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter((movie) =>
      movie.name.toLowerCase().includes(searchLower)
    )
  }

  if (filters.genre) {
    filtered = filtered.filter((movie) => movie.genre === filters.genre)
  }

  if (filters.year) {
    filtered = filtered.filter((movie) => movie.model === filters.year)
  }
  
  if (filters.awarded) {
    const isAwarded = filters.awarded === 'true'
    filtered = filtered.filter((movie) => movie.awarded === isAwarded)
  }

  return filtered
}

//atualiza filtro e reaplica
const updateFilterAndReapply = (state: MoviesState, filterName: keyof Filters, value: string) => {
  state.filters[filterName] = value
  state.movies = applyFilters(state.allMovies, state.filters)
}

//açoes assincronas
//carrega filmes paginados
export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async (page: number = 1) => {
    const response = await fetchMovies(page)
    return response
  }
)

//carrega detalhes de um filme específico
export const loadMovieDetails = createAsyncThunk(
  'movies/loadMovieDetails',
  async (id: string | number) => {
    const response = await fetchMovieById(id)
    return response
  }
)

//estado inicial
const initialState: MoviesState = {
  movies: [],
  allMovies: [],
  loading: false,
  error: null,
  nextPage: null,
  previousPage: null,
  currentMovie: null,
  loadingDetails: false,
  errorDetails: null,
  filters: {
    search: '',
    genre: '',
    year: '',
    awarded: '',
  },
}

//redux slice
//slice de filmes açoes sincronas
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    //filtros - ações que modificam o estado
    setSearchFilter: (state, action: PayloadAction<string>) => {
      updateFilterAndReapply(state, 'search', action.payload)
    },
    setGenreFilter: (state, action: PayloadAction<string>) => {
      updateFilterAndReapply(state, 'genre', action.payload)
    },
    setYearFilter: (state, action: PayloadAction<string>) => {
      updateFilterAndReapply(state, 'year', action.payload)
    },
    setAwardedFilter: (state, action: PayloadAction<string>) => {
      updateFilterAndReapply(state, 'awarded', action.payload)
    },
    //limpa filtros
    clearFilters: (state) => {
      state.filters = {
        search: '',
        genre: '',
        year: '',
        awarded: '',
      }
      state.movies = [...state.allMovies]
    },
    //limpa detalhes do filme
    clearCurrentMovie: (state) => {
      state.currentMovie = null
      state.errorDetails = null
    },
    //reseta filmes
    resetMovies: (state) => {
      state.allMovies = []
      state.movies = []
      state.nextPage = null
      state.previousPage = null
      state.filters = {
        search: '',
        genre: '',
        year: '',
        awarded: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //carrega filmes paginados
      .addCase(loadMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      //infinite scroll
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false
        
        const isFirstPage = action.payload.previous === null || action.payload.previous === 1
        
        if (isFirstPage) {
          state.allMovies = action.payload.results
        } else {
          const existingIds = new Set(state.allMovies.map(m => m.id))
          const newMovies = action.payload.results.filter(m => !existingIds.has(m.id))
          state.allMovies = [...state.allMovies, ...newMovies]
        }

        state.movies = applyFilters(state.allMovies, state.filters)
        state.nextPage = action.payload.next
        state.previousPage = action.payload.previous
      })
      //carrega filmes paginados com erro
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao carregar filmes'
      })
      //carrega detalhes de um filme específico
      .addCase(loadMovieDetails.pending, (state) => {
        state.loadingDetails = true
        state.errorDetails = null
      })
      .addCase(loadMovieDetails.fulfilled, (state, action) => { //carrega detalhes de um filme específico com sucesso
        state.loadingDetails = false
        state.currentMovie = action.payload
      })
      .addCase(loadMovieDetails.rejected, (state, action) => { //carrega detalhes de um filme específico com erro
        state.loadingDetails = false
        state.errorDetails = action.error.message || 'Erro ao carregar detalhes do filme'
      })
  },
})

//exporta as acoes
export const {
  //acoes
  clearCurrentMovie,
  setSearchFilter,
  setGenreFilter,
  setYearFilter,
  setAwardedFilter,
  clearFilters,
  resetMovies,
} = moviesSlice.actions

export default moviesSlice.reducer //exporta o reducer
