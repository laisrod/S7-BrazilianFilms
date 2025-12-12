import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import MovieList from './MovieList'
import moviesReducer from '../../store/slices/moviesSlice'
import type { MoviesState } from '../../types'

const mockStore = configureStore({
  reducer: {
    movies: moviesReducer,
  },
  preloadedState: {
    movies: {
      movies: [
        {
          id: 1,
          name: 'Cidade de Deus',
          model: '2002',
          director: 'Fernando Meirelles',
          genre: 'Drama',
        },
        {
          id: 2,
          name: 'O Auto da Compadecida',
          model: '2000',
          director: 'Guel Arraes',
          genre: 'Comédia',
        },
        {
          id: 3,
          name: 'Central do Brasil',
          model: '1998',
          director: 'Walter Salles',
          genre: 'Drama',
        },
      ],
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
      },
    } as MoviesState,
  },
})

const meta: Meta<typeof MovieList> = {
  title: 'Components/MovieList',
  component: MovieList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MovieList>

export const Default: Story = {}

export const Loading: Story = {
  decorators: [
    (Story) => {
      const loadingStore = configureStore({
        reducer: {
          movies: moviesReducer,
        },
        preloadedState: {
          movies: {
            movies: [],
            allMovies: [],
            loading: true,
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
            },
          } as MoviesState,
        },
      })
      return (
        <Provider store={loadingStore}>
          <Story />
        </Provider>
      )
    },
  ],
}

export const Error: Story = {
  decorators: [
    (Story) => {
      const errorStore = configureStore({
        reducer: {
          movies: moviesReducer,
        },
        preloadedState: {
          movies: {
            movies: [],
            allMovies: [],
            loading: false,
            error: 'Erro ao carregar dados da API',
            nextPage: null,
            previousPage: null,
            currentMovie: null,
            loadingDetails: false,
            errorDetails: null,
            filters: {
              search: '',
              genre: '',
              year: '',
            },
          } as MoviesState,
        },
      })
      return (
        <Provider store={errorStore}>
          <Story />
        </Provider>
      )
    },
  ],
}

