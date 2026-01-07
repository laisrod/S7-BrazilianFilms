import FilterInput from '../FilterInput/FilterInput'
import FilterSelect from '../FilterSelect/FilterSelect'
import { useFilters } from '../../hooks/useFilters'
import '../../styles/FilterBar.css'

const FilterBar = () => {
  const {
    filters,
    filterOptions,
    hasActiveFilters,
    handleSearchChange,
    handleGenreChange,
    handleYearChange,
    handleAwardedChange,
    handleClearFilters,
  } = useFilters()

  const { genres: genreOptions, years: yearOptions, awarded: awardedOptions } = filterOptions

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
        <FilterSelect
          label="Filtrar por prêmio"
          value={filters.awarded}
          onChange={handleAwardedChange}
          options={awardedOptions}
        />
      </div>
    </div>
  )
}

export default FilterBar

