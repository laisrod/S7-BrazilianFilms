// Tipos para Filmes
export interface Movie {
  id: number
  name: string
  model: string
  director: string
  genre: string
  image?: string
}

// Tipos para resposta da API de filmes
export interface MoviesResponse {
  results: Movie[]
  count: number
  next: number | null
  previous: number | null
}

// Tipos para filtros
export interface Filters {
  search: string
  genre: string
  year: string
}

// Tipos para opções de filtro
export interface FilterOption {
  value: string
  label: string
}

export interface FilterOptions {
  genres: FilterOption[]
  years: FilterOption[]
}

// Tipos para o estado do Redux - Movies
export interface MoviesState {
  movies: Movie[]
  allMovies: Movie[]
  loading: boolean
  error: string | null
  nextPage: number | null
  previousPage: number | null
  currentMovie: Movie | null
  loadingDetails: boolean
  errorDetails: string | null
  filters: Filters
}

import type { User } from 'firebase/auth'

// Tipos para o estado do Redux - Auth
export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

// Tipo para o RootState do Redux
export interface RootState {
  movies: MoviesState
  auth: AuthState
}