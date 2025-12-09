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
    loading: false,
    error: null,
    nextPage: null,
    previousPage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false
        state.movies = action.payload.results
        state.nextPage = action.payload.next
        state.previousPage = action.payload.previous
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default moviesSlice.reducer

