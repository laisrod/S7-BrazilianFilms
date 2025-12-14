import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './slices/moviesSlice'
import authReducer from './slices/authSlice'
import type { RootState } from '../types'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type { RootState }