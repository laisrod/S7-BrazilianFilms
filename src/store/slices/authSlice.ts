import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { signUp, signIn, signOutUser } from '../../services/authService'
import type { User } from 'firebase/auth'

//Gerenciamento de Estado (Redux) - AuthState - Estado de autenticação
interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

// registerUser - Cadastro
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }) => {
    const result = await signUp(email, password)
    if (result.error) throw new Error(result.error)
    return result.user
  }
)

// loginUser - Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const result = await signIn(email, password)
    if (result.error) throw new Error(result.error)
    return result.user
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await signOutUser()
  }
)

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => { // setUser - Define usuário manualmente
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    clearError: (state) => { // clearError - Limpa mensagens de erro
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // registerUser - Cadastro
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao cadastrar'
      })
    
    
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao fazer login'
      })
    
    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Erro ao fazer logout'
      })
  },
})

export const { setUser, clearError } = authSlice.actions
export default authSlice.reducer