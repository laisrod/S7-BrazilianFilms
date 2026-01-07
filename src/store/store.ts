import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './slices/moviesSlice'
import authReducer from './slices/authSlice'
import type { RootState } from '../types'

export const store = configureStore({
  reducer: {
    movies: moviesReducer, //gerencia filmes
    auth: authReducer, //gerencia autenticação
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora o path auth.user pois contém objetos Firebase não serializáveis
        ignoredActions: ['auth/setUser', 'auth/register/fulfilled', 'auth/login/fulfilled'],
        ignoredActionPaths: ['payload.user'],
        ignoredPaths: ['auth.user'],
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type { RootState }