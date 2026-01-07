import { useEffect } from 'react'
import MovieList from '../../components/MovieList/MovieList'
import FilterBar from '../../components/FilterBar/FilterBar'
import { useMovies } from '../../hooks/useMovies'
import '../../styles/Home.css'

const Home = () => {
  const { initializeMovies } = useMovies()

  useEffect(() => {
    // Reseta os filmes antes de carregar a primeira página
    initializeMovies()
  }, [initializeMovies])

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Cinema Brasileiro</h1>
        <p className="home__subtitle">Descubra os grandes clássicos do cinema nacional</p>
      </header>
      <main className="home__main">
        <FilterBar />
        <MovieList />
      </main>
    </div>
  )
}

export default Home

