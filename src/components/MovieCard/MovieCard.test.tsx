import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MovieCard from './MovieCard'

// Mock do useNavigate
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('MovieCard', () => {
  const defaultProps = {
    id: 1,
    name: 'Cidade de Deus',
    model: '2002',
    image: '/test-image.jpg',
  }

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('deve renderizar o nome do filme', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    expect(screen.getByText('Cidade de Deus')).toBeInTheDocument()
  })

  it('deve renderizar o ano do filme', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    expect(screen.getByText(/2002/)).toBeInTheDocument()
  })

  it('deve renderizar a imagem quando fornecida', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    const image = screen.getByAltText('Cidade de Deus')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('não deve renderizar a imagem quando não fornecida', () => {
    const { image, ...propsWithoutImage } = defaultProps
    render(
      <BrowserRouter>
        <MovieCard {...propsWithoutImage} />
      </BrowserRouter>
    )

    const imageElement = screen.queryByAltText('Cidade de Deus')
    expect(imageElement).not.toBeInTheDocument()
  })

  it('deve navegar para a página do filme quando clicado', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    const card = screen.getByTestId('movie-card')
    fireEvent.click(card)

    expect(mockNavigate).toHaveBeenCalledWith('/movie/1')
  })

  it('deve navegar quando pressionar Enter', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    const card = screen.getByTestId('movie-card')
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' })

    expect(mockNavigate).toHaveBeenCalledWith('/movie/1')
  })

  it('deve navegar quando pressionar Espaço', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    const card = screen.getByTestId('movie-card')
    fireEvent.keyDown(card, { key: ' ', code: 'Space' })

    expect(mockNavigate).toHaveBeenCalledWith('/movie/1')
  })

  it('deve ter role button para acessibilidade', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    const card = screen.getByRole('button')
    expect(card).toBeInTheDocument()
  })

  it('deve ter tabIndex 0 para navegação por teclado', () => {
    render(
      <BrowserRouter>
        <MovieCard {...defaultProps} />
      </BrowserRouter>
    )

    const card = screen.getByTestId('movie-card')
    expect(card).toHaveAttribute('tabIndex', '0')
  })
})

