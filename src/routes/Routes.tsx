import { Routes, Route, Navigate } from 'react-router-dom'
import Welcome from '../pages/Welcome/Welcome'
import Home from '../pages/Home/Home'
import MovieDetail from '../pages/MovieDetail/MovieDetail'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes

