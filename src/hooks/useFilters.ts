import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  setSearchFilter,
  setGenreFilter,
  setYearFilter,
  setAwardedFilter,
  clearFilters,
} from '../store/slices/moviesSlice'
import { getFilterOptions } from '../services/moviesService'
import type { FilterOption } from '../types'

export const useFilters = () => {
  const dispatch = useAppDispatch()
  const { filters } = useAppSelector((state) => state.movies)

  const [filterOptions, setFilterOptions] = useState<{
    genres: FilterOption[]
    years: FilterOption[]
    awarded: FilterOption[]
  }>({
    genres: [],
    years: [],
    awarded: [
      { value: 'true', label: 'Premiados' },
      { value: 'false', label: 'Não premiados' },
    ],
  })

  useEffect(() => {
    const loadFilterOptions = async () => {
      const options = await getFilterOptions()
      setFilterOptions(options)
    }
    loadFilterOptions()
  }, [])

  const handleSearchChange = (value: string) => {
    dispatch(setSearchFilter(value))
  }

  const handleGenreChange = (value: string) => {
    dispatch(setGenreFilter(value))
  }

  const handleYearChange = (value: string) => {
    dispatch(setYearFilter(value))
  }

  const handleAwardedChange = (value: string) => {
    dispatch(setAwardedFilter(value))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const hasActiveFilters = Boolean(
    filters.search || filters.genre || filters.year || filters.awarded
  )

  return {
    filters,
    filterOptions,
    hasActiveFilters,
    handleSearchChange,
    handleGenreChange,
    handleYearChange,
    handleAwardedChange,
    handleClearFilters,
  }
}

