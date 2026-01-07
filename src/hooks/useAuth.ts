import { useAppSelector, useAppDispatch } from '../store/hooks'
import { loginUser, registerUser, logoutUser, clearError } from '../store/slices/authSlice'
import { loadMovies, resetMovies } from '../store/slices/moviesSlice'
import { useNavigate, useLocation } from 'react-router-dom'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  const { user, loading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/welcome'

  const login = async (email: string, password: string) => {
    const result = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(result)) {
      dispatch(resetMovies())
      dispatch(loadMovies(1))
      navigate(from, { replace: true })
      return { success: true }
    }
    return { success: false }
  }

  const register = async (email: string, password: string) => {
    const result = await dispatch(registerUser({ email, password }))
    if (registerUser.fulfilled.match(result)) {
      navigate('/welcome', { replace: true })
      return { success: true }
    }
    return { success: false }
  }

  const logout = async () => {
    await dispatch(logoutUser())
    navigate('/login', { replace: true })
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearAuthError,
  }
}

