import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadMovies, resetMovies } from '../../store/slices/moviesSlice'
import MovieList from '../../components/MovieList/MovieList'
import FilterBar from '../../components/FilterBar/FilterBar'
import '../../styles/Home.css'
import type { AppDispatch } from '../../store/store'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    //resete os filmes antes de carregar a primeira pagina
    dispatch(resetMovies())
    dispatch(loadMovies(1))
  }, [dispatch])

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

