import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import MovieCard from './MovieCard'

const meta: Meta<typeof MovieCard> = {
  title: 'Components/MovieCard',
  component: MovieCard,
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
type Story = StoryObj<typeof MovieCard>

export const Default: Story = {
  args: {
    id: 1,
    name: 'Cidade de Deus',
    model: '2002',
  },
}

export const AutoDaCompadecida: Story = {
  args: {
    id: 2,
    name: 'O Auto da Compadecida',
    model: '2000',
  },
}

export const CentralDoBrasil: Story = {
  args: {
    id: 3,
    name: 'Central do Brasil',
    model: '1998',
  },
}

