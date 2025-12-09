import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import MovieList from './MovieList'
import moviesReducer from '../../store/slices/moviesSlice'

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
        },
        {
          id: 2,
          name: 'O Auto da Compadecida',
          model: '2000',
        },
        {
          id: 3,
          name: 'Central do Brasil',
          model: '1998',
        },
      ],
      loading: false,
      error: null,
      nextPage: null,
      previousPage: null,
    },
  },
})

export default {
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

export const Default = {}

export const Loading = {
  decorators: [
    (Story) => {
      const loadingStore = configureStore({
        reducer: {
          movies: moviesReducer,
        },
        preloadedState: {
          movies: {
            movies: [],
            loading: true,
            error: null,
            nextPage: null,
            previousPage: null,
          },
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

export const Error = {
  decorators: [
    (Story) => {
      const errorStore = configureStore({
        reducer: {
          movies: moviesReducer,
        },
        preloadedState: {
          movies: {
            movies: [],
            loading: false,
            error: 'Erro ao carregar dados da API',
            nextPage: null,
            previousPage: null,
          },
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

