import { useDispatch, useSelector } from 'react-redux'
import {
  setSearchFilter,
  setGenreFilter,
  setYearFilter,
  clearFilters,
} from '../../store/slices/moviesSlice'
import { getFilterOptions } from '../../services/moviesService'
import FilterInput from '../FilterInput/FilterInput'
import FilterSelect from '../FilterSelect/FilterSelect'
import '../../styles/FilterBar.css'
import type { RootState } from '../../types'
import type { AppDispatch } from '../../store/store'

const FilterBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { filters } = useSelector((state: RootState) => state.movies)

  // Obtém opções de filtros dinamicamente dos filmes disponíveis
  const { genres: genreOptions, years: yearOptions } = getFilterOptions()

  const handleSearchChange = (value: string) => {
    dispatch(setSearchFilter(value))
  }

  const handleGenreChange = (value: string) => {
    dispatch(setGenreFilter(value))
  }

  const handleYearChange = (value: string) => {
    dispatch(setYearFilter(value))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const hasActiveFilters = Boolean(filters.search || filters.genre || filters.year)

  return (
    <div className="filter-bar" data-testid="filter-bar">
      <div className="filter-bar__title">
        <h2>Filtros</h2>
        {hasActiveFilters && (
          <button
            className="filter-bar__clear"
            onClick={handleClearFilters}
            data-testid="clear-filters-button"
          >
            Limpar Filtros
          </button>
        )}
      </div>
      <div className="filter-bar__filters">
        <FilterInput
          label="Buscar por nome"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Digite o nome do filme..."
        />
        <FilterSelect
          label="Filtrar por gênero"
          value={filters.genre}
          onChange={handleGenreChange}
          options={genreOptions}
          placeholder="Todos os gêneros"
        />
        <FilterSelect
          label="Filtrar por ano"
          value={filters.year}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Todos os anos"
        />
      </div>
    </div>
  )
}

export default FilterBar

