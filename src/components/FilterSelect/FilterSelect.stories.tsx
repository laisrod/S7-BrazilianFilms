import type { Meta, StoryObj } from '@storybook/react'
import FilterSelect from './FilterSelect'
import type { FilterOption } from '../../types'

const meta: Meta<typeof FilterSelect> = {
  title: 'Components/FilterSelect',
  component: FilterSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof FilterSelect>

const mockGenreOptions: FilterOption[] = [
  { value: 'Drama', label: 'Drama' },
  { value: 'Comédia', label: 'Comédia' },
  { value: 'Ação', label: 'Ação' },
  { value: 'Terror', label: 'Terror' },
]

const mockYearOptions: FilterOption[] = [
  { value: '2000', label: '2000' },
  { value: '2002', label: '2002' },
  { value: '2008', label: '2008' },
  { value: '2010', label: '2010' },
]

export const Default: Story = {
  args: {
    label: 'Filtrar por gênero',
    value: '',
    options: mockGenreOptions,
    placeholder: 'Todos os gêneros',
  },
}

export const ComValorSelecionado: Story = {
  args: {
    label: 'Filtrar por gênero',
    value: 'Drama',
    options: mockGenreOptions,
    placeholder: 'Todos os gêneros',
  },
}

export const ComAnos: Story = {
  args: {
    label: 'Filtrar por ano',
    value: '',
    options: mockYearOptions,
    placeholder: 'Todos os anos',
  },
}

export const SemLabel: Story = {
  args: {
    value: '',
    options: mockGenreOptions,
    placeholder: 'Selecione...',
  },
}

