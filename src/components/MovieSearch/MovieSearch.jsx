import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../store/slices/moviesSlice'
import '../../styles/MovieSearch.css'

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchQuery(searchTerm))
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    dispatch(setSearchQuery(value))
  }

  const handleClear = () => {
    setSearchTerm('')
    dispatch(setSearchQuery(''))
  }

  return (
    <form className="movie-search" onSubmit={handleSearch} data-testid="movie-search">
      <div className="movie-search__container">
        <input
          type="text"
          className="movie-search__input"
          placeholder="Buscar filmes por nome..."
          value={searchTerm}
          onChange={handleChange}
          data-testid="movie-search-input"
        />
        {searchTerm && (
          <button
            type="button"
            className="movie-search__clear"
            onClick={handleClear}
            aria-label="Limpar busca"
            data-testid="movie-search-clear"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="movie-search__button"
          data-testid="movie-search-button"
        >
          Buscar
        </button>
      </div>
    </form>
  )
}

export default MovieSearch

