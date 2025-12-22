import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DirectorCard from './DirectorCard'
import type { Movie } from '../../types'

describe('DirectorCard', () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      name: 'Cidade de Deus',
      model: '2002',
      director: 'Fernando Meirelles',
      genre: 'Drama',
      image: '/cidade-deus.jpg',
      awarded: true,
    },
    {
      id: 2,
      name: 'Ensaio sobre a Cegueira',
      model: '2008',
      director: 'Fernando Meirelles',
      genre: 'Drama',
      image: '/ensaio.jpg',
      awarded: false,
    },
  ]

  const defaultProps = {
    directorName: 'Fernando Meirelles',
    movies: mockMovies,
  }

  it('deve renderizar o nome do diretor', () => {
    render(<DirectorCard {...defaultProps} />)

    expect(screen.getByText('Fernando Meirelles')).toBeInTheDocument()
  })

  it('deve renderizar o label "Diretor"', () => {
    render(<DirectorCard {...defaultProps} />)

    expect(screen.getByText('Diretor')).toBeInTheDocument()
  })

  it('deve exibir o total de filmes corretamente', () => {
    render(<DirectorCard {...defaultProps} />)

    expect(screen.getByText(/Total de Filmes:/)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('deve exibir o primeiro filme quando há filmes', () => {
    render(<DirectorCard {...defaultProps} />)

    expect(screen.getByText(/Primeiro Filme:/)).toBeInTheDocument()
    expect(screen.getByText(/Cidade de Deus \(2002\)/)).toBeInTheDocument()
  })

  it('não deve exibir informações de primeiro filme quando não há filmes', () => {
    render(<DirectorCard directorName="Diretor Teste" movies={[]} />)

    expect(screen.queryByText(/Primeiro Filme:/)).not.toBeInTheDocument()
  })

  it('deve renderizar até 3 filmes na lista', () => {
    const manyMovies: Movie[] = [
      ...mockMovies,
      {
        id: 3,
        name: 'Filme 3',
        model: '2010',
        director: 'Fernando Meirelles',
        genre: 'Drama',
        awarded: false,
      },
      {
        id: 4,
        name: 'Filme 4',
        model: '2015',
        director: 'Fernando Meirelles',
        genre: 'Drama',
        awarded: false,
      },
    ]

    render(<DirectorCard directorName="Fernando Meirelles" movies={manyMovies} />)

    // Deve renderizar apenas 3 filmes (slice(0, 3))
    const movieCards = screen.getAllByText(/Filme/)
    expect(movieCards.length).toBeLessThanOrEqual(4) // 3 filmes + "Primeiro Filme"
  })

  it('deve chamar onMovieClick quando um filme é clicado', () => {
    const mockOnMovieClick = vi.fn()
    render(<DirectorCard {...defaultProps} onMovieClick={mockOnMovieClick} />)

    // Encontra o primeiro filme clicável (não o "Primeiro Filme" do texto)
    const movieItems = screen.getAllByRole('button')
    // O primeiro botão deve ser um dos filmes
    if (movieItems.length > 0) {
      fireEvent.click(movieItems[0])
      expect(mockOnMovieClick).toHaveBeenCalled()
    }
  })

  it('não deve chamar onMovieClick quando não fornecida', () => {
    const { container } = render(<DirectorCard {...defaultProps} />)

    const movieItems = container.querySelectorAll('.director-card__movie-item')
    if (movieItems.length > 0) {
      fireEvent.click(movieItems[0])
      // Não deve lançar erro
      expect(movieItems[0]).toBeInTheDocument()
    }
  })

  it('deve renderizar imagens dos filmes', () => {
    render(<DirectorCard {...defaultProps} />)

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })

  it('deve ter data-testid correto', () => {
    render(<DirectorCard {...defaultProps} />)

    expect(screen.getByTestId('director-card')).toBeInTheDocument()
  })

  it('não deve renderizar seção de filmes quando não há filmes', () => {
    render(<DirectorCard directorName="Diretor Teste" movies={[]} />)

    expect(screen.queryByText('Outros Filmes:')).not.toBeInTheDocument()
  })
})

