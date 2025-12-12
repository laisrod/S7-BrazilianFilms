import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { fetchMovies, fetchMovieById } from '../../services/moviesService'
import type { Movie, MoviesState, Filters } from '../../types'

// Função auxiliar para aplicar filtros
const applyFilters = (movies: Movie[], filters: Filters): Movie[] => {
  let filtered = [...movies]

  // Filtro por busca (nome)
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter((movie) =>
      movie.name.toLowerCase().includes(searchLower)
    )
  }

  // Filtro por gênero
  if (filters.genre) {
    filtered = filtered.filter((movie) => movie.genre === filters.genre)
  }

  // Filtro por ano
  if (filters.year) {
    filtered = filtered.filter((movie) => movie.model === filters.year)
  }

  return filtered
}

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async (page: number = 1) => {
    const response = await fetchMovies(page)
    return response
  }
)

export const loadMovieDetails = createAsyncThunk(
  'movies/loadMovieDetails',
  async (id: string | number) => {
    const response = await fetchMovieById(id)
    return response
  }
)

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
  },
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null
      state.errorDetails = null
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      // Reaplica filtros quando muda o filtro de busca
      state.movies = applyFilters(state.allMovies, {
        ...state.filters,
        search: action.payload,
      })
    },
    setGenreFilter: (state, action: PayloadAction<string>) => {
      state.filters.genre = action.payload
      // Reaplica filtros quando muda o filtro de gênero
      state.movies = applyFilters(state.allMovies, {
        ...state.filters,
        genre: action.payload,
      })
    },
    setYearFilter: (state, action: PayloadAction<string>) => {
      state.filters.year = action.payload
      // Reaplica filtros quando muda o filtro de ano
      state.movies = applyFilters(state.allMovies, {
        ...state.filters,
        year: action.payload,
      })
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        genre: '',
        year: '',
      }
      // Restaura todos os filmes quando limpa os filtros
      state.movies = [...state.allMovies]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false
        console.log('Dados recebidos no Redux:', action.payload.results) // Debug
        // Salva todos os filmes carregados
        state.allMovies = action.payload.results
        // Aplica filtros aos filmes carregados
        state.movies = applyFilters(action.payload.results, state.filters)
        state.nextPage = action.payload.next
        state.previousPage = action.payload.previous
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao carregar filmes'
      })
      .addCase(loadMovieDetails.pending, (state) => {
        state.loadingDetails = true
        state.errorDetails = null
      })
      .addCase(loadMovieDetails.fulfilled, (state, action) => {
        state.loadingDetails = false
        state.currentMovie = action.payload
      })
      .addCase(loadMovieDetails.rejected, (state, action) => {
        state.loadingDetails = false
        state.errorDetails = action.error.message || 'Erro ao carregar detalhes do filme'
      })
  },
})

export const {
  clearCurrentMovie,
  setSearchFilter,
  setGenreFilter,
  setYearFilter,
  clearFilters,
} = moviesSlice.actions

export default moviesSlice.reducer

