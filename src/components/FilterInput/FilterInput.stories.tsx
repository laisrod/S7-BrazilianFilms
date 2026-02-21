import type { Meta, StoryObj } from '@storybook/react'
import FilterInput from './FilterInput'

// componente simples
const meta: Meta<typeof FilterInput> = {
  title: 'Components/FilterInput',
  component: FilterInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof FilterInput>

export const Default: Story = {
  args: {
    label: 'Buscar por nome',
    value: '',
    placeholder: 'Digite o nome do filme...',
  },
}

export const ComValor: Story = {
  args: {
    label: 'Buscar por nome',
    value: 'Cidade de Deus',
    placeholder: 'Digite o nome do filme...',
  },
}

export const SemLabel: Story = {
  args: {
    value: '',
    placeholder: 'Digite aqui...',
  },
}

export const ComTipoEmail: Story = {
  args: {
    label: 'Email',
    value: '',
    placeholder: 'seu@email.com',
    type: 'email',
  },
}

