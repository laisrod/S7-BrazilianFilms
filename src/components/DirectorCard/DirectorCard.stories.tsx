import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import DirectorCard from './DirectorCard'
import type { Movie } from '../../types'

const meta: Meta<typeof DirectorCard> = {
  title: 'Components/DirectorCard',
  component: DirectorCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DirectorCard>

const mockMoviesFernando: Movie[] = [
  {
    id: 1,
    name: 'Cidade de Deus',
    model: '2002',
    director: 'Fernando Meirelles',
    genre: 'Drama',
    image: 'https://via.placeholder.com/150x225/006b3c/ffd700?text=Cidade+de+Deus',
  },
  {
    id: 2,
    name: 'Ensaio sobre a Cegueira',
    model: '2008',
    director: 'Fernando Meirelles',
    genre: 'Drama',
    image: 'https://via.placeholder.com/150x225/006b3c/ffd700?text=Ensaio',
  },
  {
    id: 3,
    name: '360',
    model: '2011',
    director: 'Fernando Meirelles',
    genre: 'Drama',
    image: 'https://via.placeholder.com/150x225/006b3c/ffd700?text=360',
  },
]

const mockMoviesWalter: Movie[] = [
  {
    id: 4,
    name: 'Central do Brasil',
    model: '1998',
    director: 'Walter Salles',
    genre: 'Drama',
    image: 'https://via.placeholder.com/150x225/006b3c/ffd700?text=Central',
  },
]

export const Default: Story = {
  args: {
    directorName: 'Fernando Meirelles',
    movies: mockMoviesFernando,
  },
}

export const ComUmFilme: Story = {
  args: {
    directorName: 'Walter Salles',
    movies: mockMoviesWalter,
  },
}

export const SemFilmes: Story = {
  args: {
    directorName: 'Diretor Desconhecido',
    movies: [],
  },
}

export const ComMuitosFilmes: Story = {
  args: {
    directorName: 'Fernando Meirelles',
    movies: [
      ...mockMoviesFernando,
      {
        id: 5,
        name: 'O Jardineiro Fiel',
        model: '2005',
        director: 'Fernando Meirelles',
        genre: 'Drama',
        image: 'https://via.placeholder.com/150x225/006b3c/ffd700?text=Jardineiro',
      },
      {
        id: 6,
        name: 'Dois Irmãos',
        model: '2004',
        director: 'Fernando Meirelles',
        genre: 'Drama',
        image: 'https://via.placeholder.com/150x225/006b3c/ffd700?text=Dois+Irmãos',
      },
    ],
  },
}

