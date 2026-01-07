// Tipos para Filmes
export interface Movie {
  id: number
  name: string
  model: string
  director: string
  genre: string
  image?: string
  awarded?: boolean
  imdbID?: string
  tmdbId?: number
}

// Tipos para resposta da API TMDb
export interface TMDBMovieResponse {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: any
  budget: number
  genres: Array<{ id: number; name: string }>
  homepage: string | null
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: Array<{ id: number; name: string; logo_path: string | null; origin_country: string }>
  production_countries: Array<{ iso_3166_1: string; name: string }>
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: Array<{ english_name: string; iso_639_1: string; name: string }>
  status: string
  tagline: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBSearchResponse {
  page: number
  results: Array<{
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }>
  total_pages: number
  total_results: number
}

export interface TMDBWatchProvider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface TMDBWatchProvidersResponse {
  id: number
  results: {
    BR?: {
      link: string
      flatrate?: TMDBWatchProvider[]
      rent?: TMDBWatchProvider[]
      buy?: TMDBWatchProvider[]
    }
    [country: string]: {
      link: string
      flatrate?: TMDBWatchProvider[]
      rent?: TMDBWatchProvider[]
      buy?: TMDBWatchProvider[]
    } | undefined
  }
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
  awarded: string
}

// Tipos para opções de filtro
export interface FilterOption {
  value: string
  label: string
}

export interface FilterOptions {
  genres: FilterOption[]
  years: FilterOption[]
  awarded: FilterOption[]
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