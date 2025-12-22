import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import FilterBar from './FilterBar'
import moviesReducer from '../../store/slices/moviesSlice'

// Helper para criar store de teste
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
    },
    preloadedState: {
      movies: {
        movies: [],
        allMovies: [],
        loading: false,
        error: null,
        nextPage: null,
        previousPage: null,
        currentMovie: null,
        loadingDetails: false,
        errorDetails: null,
        filters: {
          search: '',
          genre: '',
          year: '',
          awarded: '',
        },
        ...initialState,
      },
    },
  })
}

// Wrapper component para testes
const TestWrapper = ({ children, store }: { children: React.ReactNode; store: ReturnType<typeof createTestStore> }) => {
  return <Provider store={store}>{children}</Provider>
}

describe('FilterBar', () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    store = createTestStore()
  })

  it('deve renderizar o título "Filtros"', () => {
    render(
      <TestWrapper store={store}>
        <FilterBar />
      </TestWrapper>
    )

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('deve renderizar o input de busca', () => {
    render(
      <TestWrapper store={store}>
        <FilterBar />
      </TestWrapper>
    )

    const searchInput = screen.getByPlaceholderText('Digite o nome do filme...')
    expect(searchInput).toBeInTheDocument()
  })

  it('deve renderizar os selects de filtro', () => {
    render(
      <TestWrapper store={store}>
        <FilterBar />
      </TestWrapper>
    )

    expect(screen.getByText('Filtrar por gênero')).toBeInTheDocument()
    expect(screen.getByText('Filtrar por ano')).toBeInTheDocument()
    expect(screen.getByText('Filtrar por prêmio')).toBeInTheDocument()
  })

  it('deve ter data-testid correto', () => {
    render(
      <TestWrapper store={store}>
        <FilterBar />
      </TestWrapper>
    )

    expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
  })

  it('não deve mostrar botão "Limpar Filtros" quando não há filtros ativos', () => {
    render(
      <TestWrapper store={store}>
        <FilterBar />
      </TestWrapper>
    )

    expect(screen.queryByTestId('clear-filters-button')).not.toBeInTheDocument()
  })

  it('deve mostrar botão "Limpar Filtros" quando há filtro de busca ativo', () => {
    const storeWithFilter = createTestStore({
      filters: {
        search: 'teste',
        genre: '',
        year: '',
        awarded: '',
      },
    })

    render(
      <TestWrapper store={storeWithFilter}>
        <FilterBar />
      </TestWrapper>
    )

    expect(screen.getByTestId('clear-filters-button')).toBeInTheDocument()
    expect(screen.getByText('Limpar Filtros')).toBeInTheDocument()
  })

  it('deve mostrar botão "Limpar Filtros" quando há filtro de gênero ativo', () => {
    const storeWithFilter = createTestStore({
      filters: {
        search: '',
        genre: 'Drama',
        year: '',
        awarded: '',
      },
    })

    render(
      <TestWrapper store={storeWithFilter}>
        <FilterBar />
      </TestWrapper>
    )

    expect(screen.getByTestId('clear-filters-button')).toBeInTheDocument()
  })

  it('deve atualizar o filtro de busca quando o usuário digita', () => {
    render(
      <TestWrapper store={store}>
        <FilterBar />
      </TestWrapper>
    )

    const searchInput = screen.getByPlaceholderText('Digite o nome do filme...')
    fireEvent.change(searchInput, { target: { value: 'Cidade' } })

    expect(searchInput).toHaveValue('Cidade')
  })

  it('deve limpar filtros quando o botão é clicado', () => {
    const storeWithFilter = createTestStore({
      filters: {
        search: 'teste',
        genre: 'Drama',
        year: '2002',
        awarded: 'true',
      },
    })

    render(
      <TestWrapper store={storeWithFilter}>
        <FilterBar />
      </TestWrapper>
    )

    const clearButton = screen.getByTestId('clear-filters-button')
    fireEvent.click(clearButton)

    // Após clicar, o botão deve desaparecer
    expect(screen.queryByTestId('clear-filters-button')).not.toBeInTheDocument()
  })

  it('deve atualizar o filtro de gênero quando uma opção é selecionada', () => {
    render(
      <TestWrapper store={store}>
        <FilterBar />
      </TestWrapper>
    )

    // Encontra o select de gênero
    const selects = screen.getAllByTestId('filter-select')
    const genreSelect = selects.find((select) => {
      const label = select.closest('.filter-select')?.querySelector('label')
      return label?.textContent?.includes('gênero')
    })

    if (genreSelect) {
      fireEvent.change(genreSelect, { target: { value: 'Drama' } })
      expect(genreSelect).toHaveValue('Drama')
    }
  })
})

