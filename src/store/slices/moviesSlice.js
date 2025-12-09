import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMovies } from '../../services/moviesService'

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async (page = 1) => {
    const response = await fetchMovies(page)
    return response
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    allMovies: [], // Store all loaded movies for filtering
    loading: false,
    error: null,
    nextPage: null,
    previousPage: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      const query = action.payload.toLowerCase().trim()
      
      if (query === '') {
        state.movies = state.allMovies
      } else {
        state.movies = state.allMovies.filter((movie) =>
          movie.name.toLowerCase().includes(query)
        )
      }
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
        state.allMovies = action.payload.results
        // Apply search filter if there's an active search query
        const query = state.searchQuery.toLowerCase().trim()
        if (query === '') {
          state.movies = action.payload.results
        } else {
          state.movies = action.payload.results.filter((movie) =>
            movie.name.toLowerCase().includes(query)
          )
        }
        state.nextPage = action.payload.next
        state.previousPage = action.payload.previous
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setSearchQuery } = moviesSlice.actions
export default moviesSlice.reducer

